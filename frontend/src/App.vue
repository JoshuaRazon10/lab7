<template>
  <div id="app">
    <h1>🧠 Mood Tracker</h1>
    <p class="subtitle">SE2 Lab 7 – Advanced Debugging & Diagnostics</p>
    <MoodForm />
    <MoodHistory ref="moodHistory" />
  </div>
</template>

<script>
import MoodForm from './components/MoodForm.vue'
import MoodHistory from './components/MoodHistory.vue'

export default {
  name: 'App',
  components: {
    MoodForm,
    MoodHistory
  }
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background: linear-gradient(135deg, #0f0c29, #302b63, #24243e);
  min-height: 100vh;
  color: #e0e0e0;
}

#app {
  max-width: 600px;
  margin: 0 auto;
  padding: 40px 20px;
  text-align: center;
}

h1 {
  font-size: 2.5rem;
  margin-bottom: 8px;
  background: linear-gradient(90deg, #a78bfa, #60a5fa);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

.subtitle {
  color: #9ca3af;
  margin-bottom: 32px;
  font-size: 0.95rem;
}
</style>
