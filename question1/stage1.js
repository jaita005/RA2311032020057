

const API_URL = "http://20.207.122.201/evaluation-service/notifications";

const TOKEN = "your_access_token";
const weightMap = {
  Placement: 3,
  Result: 2,
  Event: 1,
};

async function getTopNotifications() {
  try {
    const res = await fetch(API_URL, {
      headers: {
        Authorization: `Bearer ${TOKEN}`,
      },
    });

    const data = await res.json();

    const sorted = data.notifications.sort((a, b) => {
      const wA = weightMap[a.Type] || 0;
      const wB = weightMap[b.Type] || 0;

      if (wA !== wB) return wB - wA;

      return new Date(b.Timestamp) - new Date(a.Timestamp);
    });

    const top10 = sorted.slice(0, 10);

    console.log("\nTop 10 Notifications:\n");

    top10.forEach((n, i) => {
      console.log(`${i + 1}. [${n.Type}] ${n.Message}`);
    });

  } catch (err) {
    console.error("Error:", err);
  }
}

getTopNotifications();