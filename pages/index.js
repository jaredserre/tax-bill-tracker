import { supabase } from "../lib/supabase";

export async function getServerSideProps() {
  const { data } = await supabase
    .from("bills")
    .select("*")
    .order("latest_action_date", { ascending: false });

  return {
    props: {
      bills: data || [],
    },
  };
}

export default function Home({ bills }) {
  return (
    <div style={{ padding: "24px", fontFamily: "Arial, sans-serif" }}>
      <h1>Tax Bill Tracker</h1>
      <p>
        <a href="/passed">Passed Bills</a> |{" "}
        <a href="/events">Committee Events</a>
      </p>

      <table
        border="1"
        cellPadding="8"
        style={{ borderCollapse: "collapse", marginTop: "20px" }}
      >
        <thead>
          <tr>
            <th>Bill</th>
            <th>Title</th>
            <th>Committee</th>
            <th>Latest Action</th>
            <th>Date</th>
            <th>Link</th>
          </tr>
        </thead>
        <tbody>
          {bills.map((bill) => (
            <tr key={bill.id}>
              <td>{bill.display_number}</td>
              <td>{bill.title}</td>
              <td>{bill.committee}</td>
              <td>{bill.latest_action}</td>
              <td>{bill.latest_action_date}</td>
              <td>
                <a href={bill.congress_url} target="_blank" rel="noreferrer">
                  Congress.gov
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
