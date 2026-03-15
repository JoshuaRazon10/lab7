<template>
  <div class="mood-form-card">
    <h2>How are you feeling?</h2>
    <form @submit.prevent="submitMood">
      <input
        id="mood-input"
        v-model="mood"
        type="text"
        placeholder="Enter your mood..."
        required
      />
      <button id="submit-mood" type="submit">Submit Mood</button>
    </form>
    <p v-if="message" class="success-msg">{{ message }}</p>
    <p v-if="error" class="error-msg">{{ error }}</p>
  </div>
</template>

<script>
export default {
  name: 'MoodForm',
  data() {
    return {
      mood: '',
      message: '',
      error: ''
    }
  },
  methods: {
    async submitMood() {
      // ── Part 0.1 – UI Logging ──────────────────────────
      console.log("User clicked submit button");          // Log the event
      console.log("Mood value entered:", this.mood);       // Log the input data

      this.message = '';
      this.error = '';

        const apiUrl = `${import.meta.env.VITE_API_URL || 'http://localhost:3000'}/mood`;
        console.log("Fetching from URL:", apiUrl);

        const response = await fetch(apiUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ mood: this.mood })
        });

        console.log("API response status:", response.status); // Log the server response status

        const data = await response.json();

        if (response.ok) {
          this.message = data.message;
          this.mood = '';  // Clear input after success
        } else {
          this.error = data.error || "Something went wrong";
        }
      } catch (err) {
        console.error("Fetch error:", err);
        this.error = "Could not connect to the API. Is the server running?";
      }
    }
  }
}
</script>

<style scoped>
.mood-form-card {
  background: rgba(255, 255, 255, 0.06);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  padding: 32px;
  margin-bottom: 24px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  transition: transform 0.2s ease;
}

.mood-form-card:hover {
  transform: translateY(-2px);
}

h2 {
  color: #c4b5fd;
  margin-bottom: 20px;
  font-size: 1.3rem;
}

form {
  display: flex;
  gap: 12px;
}

input {
  flex: 1;
  padding: 12px 16px;
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.15);
  background: rgba(255, 255, 255, 0.08);
  color: #fff;
  font-size: 1rem;
  outline: none;
  transition: border-color 0.2s;
}

input:focus {
  border-color: #a78bfa;
}

input::placeholder {
  color: #9ca3af;
}

button {
  padding: 12px 24px;
  border-radius: 10px;
  border: none;
  background: linear-gradient(135deg, #7c3aed, #6366f1);
  color: #fff;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: 0.95rem;
}

button:hover {
  background: linear-gradient(135deg, #6d28d9, #4f46e5);
  box-shadow: 0 4px 15px rgba(124, 58, 237, 0.4);
  transform: translateY(-1px);
}

.success-msg {
  color: #34d399;
  margin-top: 16px;
  font-size: 0.9rem;
}

.error-msg {
  color: #f87171;
  margin-top: 16px;
  font-size: 0.9rem;
}
</style>
