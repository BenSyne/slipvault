'use client';

// Performance tracker for measuring end-to-end flow time
class PerformanceTracker {
  private markers: Map<string, number> = new Map();
  private logs: Array<{marker: string, timestamp: number, elapsed?: number}> = [];

  // Mark a point in time
  mark(marker: string): void {
    const timestamp = performance.now();
    this.markers.set(marker, timestamp);
    this.logs.push({ marker, timestamp });
    
    // Log to console during development
    console.info(`[Performance] ${marker}: ${timestamp.toFixed(2)}ms`);
  }

  // Measure time between two markers
  measure(from: string, to: string): number | null {
    const fromTime = this.markers.get(from);
    const toTime = this.markers.get(to);
    
    if (!fromTime || !toTime) {
      console.warn(`[Performance] Could not measure from "${from}" to "${to}". Missing markers.`);
      return null;
    }
    
    const elapsed = toTime - fromTime;
    this.logs.push({ marker: `${from} → ${to}`, timestamp: toTime, elapsed });
    
    // Log to console during development
    console.info(`[Performance] ${from} → ${to}: ${elapsed.toFixed(2)}ms`);
    
    return elapsed;
  }

  // Get the total elapsed time from first to last marker
  getTotalTime(): number | null {
    if (this.logs.length < 2) {
      return null;
    }
    
    const first = this.logs[0].timestamp;
    const last = this.logs[this.logs.length - 1].timestamp;
    
    return last - first;
  }

  // Get formatted log of all performance measurements
  getLogs(): string {
    let output = "Performance Measurements:\n";
    
    // Add individual markers
    for (const log of this.logs) {
      if (log.elapsed !== undefined) {
        output += `${log.marker}: ${log.elapsed.toFixed(2)}ms\n`;
      }
    }
    
    // Add total time
    const totalTime = this.getTotalTime();
    if (totalTime !== null) {
      output += `\nTotal Time: ${totalTime.toFixed(2)}ms (${(totalTime / 1000).toFixed(2)}s)`;
      
      // Check if meets 60-second requirement
      if (totalTime <= 60000) {
        output += " ✅";
      } else {
        output += " ❌";
      }
    }
    
    return output;
  }

  // Reset all measurements
  reset(): void {
    this.markers.clear();
    this.logs = [];
  }
}

// Create a singleton instance
export const performanceTracker = new PerformanceTracker(); 