
import { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Card,
  CardContent,
  Select,
  MenuItem,
  Button,
  Box,
} from "@mui/material";

const API = "http://20.207.122.201/evaluation-service/notifications";
const TOKEN = "access_token";

const weightMap = {
  Placement: 3,
  Result: 2,
  Event: 1,
};

function App() {
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState("");
  const [page, setPage] = useState(1);
  const [showPriority, setShowPriority] = useState(false);
  const [readIds, setReadIds] = useState([]);

  const limit = 5;

  useEffect(() => {
    fetch(API, {
      headers: {
        Authorization: `Bearer ${TOKEN}`,
      },
    })
      .then((res) => res.json())
      .then((d) => {
        if (d && d.notifications && d.notifications.length > 0) {
          setData(d.notifications);
        } else {
          throw new Error("Empty API");
        }
      })
      .catch(() => {
        setData([
          {
            ID: "1",
            Type: "Placement",
            Message: "Company hiring",
            Timestamp: "2026-04-22 17:51:30",
          },
          {
            ID: "2",
            Type: "Result",
            Message: "Mid sem results",
            Timestamp: "2026-04-22 17:50:00",
          },
          {
            ID: "3",
            Type: "Event",
            Message: "Farewell event",
            Timestamp: "2026-04-22 17:49:00",
          },
          {
            ID: "4",
            Type: "Placement",
            Message: "Internship drive",
            Timestamp: "2026-04-22 17:48:00",
          },
          {
            ID: "5",
            Type: "Result",
            Message: "End sem results",
            Timestamp: "2026-04-22 17:47:00",
          },
          {
            ID: "6",
            Type: "Event",
            Message: "Workshop",
            Timestamp: "2026-04-22 17:46:00",
          },
        ]);
      });
  }, []);

  const filtered = data.filter(
    (item) =>
      !filter ||
      item.Type === filter ||
      item.type === filter
  );

  const priorityData = [...filtered]
    .sort((a, b) => {
      const wA = weightMap[a.Type] || 0;
      const wB = weightMap[b.Type] || 0;

      if (wA !== wB) return wB - wA;

      return new Date(b.Timestamp) - new Date(a.Timestamp);
    })
    .slice(0, 10);

  const currentData = showPriority ? priorityData : filtered;


  const paginated = currentData.slice(
    (page - 1) * limit,
    page * limit
  );


  const markRead = (id) => {
    if (!readIds.includes(id)) {
      setReadIds([...readIds, id]);
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Notifications App
      </Typography>

      {/* FILTER + TOGGLE */}
      <Box display="flex" gap={2} mb={2}>
        <Select
          value={filter}
          onChange={(e) => {
            setFilter(e.target.value);
            setPage(1);
          }}
          displayEmpty
        >
          <MenuItem value="">All</MenuItem>
          <MenuItem value="Event">Event</MenuItem>
          <MenuItem value="Result">Result</MenuItem>
          <MenuItem value="Placement">Placement</MenuItem>
        </Select>

        <Button
          variant="contained"
          onClick={() => {
            setShowPriority(!showPriority);
            setPage(1);
          }}
        >
          {showPriority ? "Show All" : "Priority"}
        </Button>
      </Box>

      {/* LIST */}
      {paginated.length > 0 ? (
        paginated.map((item) => (
          <Card
            key={item.ID}
            onClick={() => markRead(item.ID)}
            sx={{
              mb: 2,
              backgroundColor: readIds.includes(item.ID)
                ? "#e0e0e0"
                : "#ffffff",
              cursor: "pointer",
            }}
          >
            <CardContent>
              <Typography variant="h6">
                {item.Type}
              </Typography>
              <Typography>{item.Message}</Typography>
              <Typography variant="caption">
                {item.Timestamp}
              </Typography>
            </CardContent>
          </Card>
        ))
      ) : (
        <Typography>No notifications available</Typography>
      )}

      {/* PAGINATION */}
      <Box display="flex" gap={2} mt={2}>
        <Button
          variant="outlined"
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
        >
          Prev
        </Button>

        <Typography>Page {page}</Typography>

        <Button
          variant="outlined"
          disabled={page * limit >= currentData.length}
          onClick={() => setPage(page + 1)}
        >
          Next
        </Button>
      </Box>
    </Container>
  );
}

export default App;