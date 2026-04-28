import { supabase } from "../lib/supabase";

export async function getServerSideProps() {
  const { data } = await supabase
    .from("committee_events")
    .select("*")
    .order("event_date", { ascending: true });

  return {
    props: {
      events: data || [],
    },
  };
}

export default function Events({ events }) {
  return (
    <div style={{ padding: "24px", fontFamily: "Arial, sans-serif" }}>
      <h1>Committee Events</h1>
      <p>
        <a href="/">Home</a> | <a href="/passed">Passed Bills</a>
      </p>

      <table
        border="1"
        cellPadding="8"
        style={{ borderCollapse: "collapse", marginTop: "20px" }}
      >
        <thead>
          <tr>
            <th>Committee</th>
            <th>Type</th>
            <th>Title</th>
            <th>Date</th>
            <th>Source</th>
          </tr>
        </thead>
        <tbody>
          {events.map((event) => (
            <tr key={event.id}>
              <td>{event.committee_name}</td>
              <td>{event.event_type}</td>
              <td>{event.title}</td>
              <td>{event.event_date}</td>
              <td>
                <a href={event.source_url} target="_blank" rel="noreferrer">
                  Source
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
