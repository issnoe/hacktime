import { render, screen, act } from "@testing-library/react";
import { TimeProvider } from "./state/timerContextWithReducer";
test("fetches and displays times", async () => {
  // Render the component within the TimeProvider
  // render(<TimeProvider></TimeProvider>);
  // // Use act() to handle asynchronous updates
  // await act(async () => {
  //   // Trigger fetchTimes or any other actions
  //   // const fetchButton = screen.getByText("Fetch Times"); // Adjust to your component's specific action
  //   // fireEvent.click(fetchButton);
  //   // Wait for the component to update
  //   await waitFor(() => {
  //     // Assertions here
  //     expect(screen.getByText("Some Time Display")).toBeInTheDocument(); // Adjust to your component's specific result
  //   });
  // });
});
