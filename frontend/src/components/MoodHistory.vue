<template>
  <div class="mood-history-card">
    <h2>📋 Mood History</h2>
    <button id="fetch-history" @click="fetchMoods" class="refresh-btn">
      Refresh History
    </button>
    <div v-if="loading" class="loading">Loading...</div>
    <ul v-else-if="moods.length > 0">
      <li v-for="entry in moods" :key="entry.id" class="mood-entry">
        <span class="mood-text">{{ entry.mood }}</span>
        <span class="mood-date">{{ formatDate(entry.created_at) }}</span>
      </li>
    </ul>
    <p v-else class="empty">No mood entries yet. Submit your first mood!</p>
  </div>
</template>

<script>
export default {
  name: 'MoodHistory',
  data() {
    return {
      moods: [],
      loading: false
    }
  },
  mounted() {
    this.fetchMoods();
  },
  methods: {
    async fetchMoods() {
      console.log("Fetching mood history...");
      this.loading = true;

      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:3000'}/moods`);
        console.log("Mood history response status:", response.status);

        const data = await response.json();
        console.log("Mood history data:", data);
        this.moods = data;
      } catch (err) {
        console.error("Error fetching moods:", err);
      } finally {
        this.loading = false;
      }
    },
    formatDate(dateStr) {
      return new Date(dateStr).toLocaleString();
    }
  }
}
</script>

<style scoped>
.mood-history-card {
  background: rgba(255, 255, 255, 0.06);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  padding: 32px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
}

h2 {
  color: #c4b5fd;
  margin-bottom: 16px;
  font-size: 1.3rem;
}

.refresh-btn {
  padding: 8px 18px;
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.15);
  background: rgba(255, 255, 255, 0.08);
  color: #e0e0e0;
  cursor: pointer;
  font-size: 0.85rem;
  margin-bottom: 16px;
  transition: all 0.2s ease;
}

.refresh-btn:hover {
  background: rgba(255, 255, 255, 0.12);
  border-color: #a78bfa;
}

ul {
  list-style: none;
  padding: 0;
}

.mood-entry {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.04);
  margin-bottom: 8px;
  transition: background 0.2s;
}

.mood-entry:hover {
  background: rgba(255, 255, 255, 0.08);
}

.mood-text {
  font-weight: 500;
  color: #e0e0e0;
}

.mood-date {
  font-size: 0.8rem;
  color: #6b7280;
}

.loading {
  color: #9ca3af;
  padding: 20px;
}

.empty {
  color: #6b7280;
  padding: 20px;
  font-style: italic;
}
</style>
