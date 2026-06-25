# Notification System Design

## Stage 1

### Scoring Approach
The Priority Inbox uses a combined scoring formula based on two primary factors:
1. **Category Weight:** A fixed base weight where `placement` (100) > `result` (50) > `event` (10).
2. **Recency:** A dynamically decaying score based on the age of the notification. The recency score uses an inverse decay function: `100 / (ageInHours + 1)`.

**Formula:**
`Priority Score = BaseWeight + (100 / (AgeInHours + 1))`

This approach guarantees that category remains the primary sorting factor for recent notifications, but as notifications age, their recency score decays, allowing the deterministic and explainable sorting of incoming notifications.

### Data Structures Used
A **Min-Heap** bounded to a maximum size of 10 (`maxSize = 10`) is used to maintain the top notifications.
When the heap reaches its capacity, any new notification's score is compared against the minimum score in the heap (the root element). If the new notification's score is higher, the minimum element is removed, and the new notification is inserted.

### Maintaining Top 10 Efficiently
As continuous new notifications are streamed in, we avoid sorting the entire list of all historical notifications every time an update occurs. Instead:
1. Unread incoming notifications are passed to the `calculatePriorityScore` function.
2. The notification score is compared with the smallest score of the top 10 (root of the Min-Heap).
3. If it is smaller or equal, it is ignored. If it is larger, it replaces the root, and the heap is restored using `heapifyDown`.
This keeps the active working set restricted to exactly 10 items at any time, allowing for highly efficient, near real-time ingestion.

### Complexity
- **Time Complexity:**
  - **Insertion:** `O(log k)` where `k` is the max size of the heap (10). For practical purposes, `log(10)` is a tiny constant `O(1)`.
  - **Retrieving Top 10:** `O(k log k)` to return the sorted version of the heap when rendering the UI. This is effectively `O(1)`.
- **Space Complexity:** `O(k)`, specifically `O(10)` since we only maintain up to 10 notification items in memory. The spatial footprint remains constant regardless of millions of processed incoming notifications.

### Assumptions and Edge Cases
1. **Pre-authorization:** Users are assumed to be pre-authorized. User ID is not heavily utilized in the core ranking algorithm for Stage 1.
2. **Read Notifications:** Any notification marked `read: true` is immediately filtered out before scoring.
3. **Timestamp Consistency:** `receivedAt` is assumed to be a valid timestamp in milliseconds. Notifications from the future could theoretically skew recency if clock drift occurs.
4. **Duplicate Identifiers:** We assume each incoming notification ID is unique.

