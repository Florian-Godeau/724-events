import { fireEvent, render, screen, act, within } from "@testing-library/react";
import { api, DataProvider } from "../../contexts/DataContext";
import Home from "./index";

// Données simulées pour le test
const mockData = {
  events: [
    { id: 1, title: "Événement 1", date: "2023-01-01", description: "Description 1" },
    { id: 2, title: "Événement 2", date: "2023-02-01", description: "Description 2" },
    { id: 3, title: "Événement 3", date: "2023-03-01", description: "Description 3" },
    { id: 4, title: "Événement 4", date: "2023-04-01", description: "Description 4" },
    { id: 5, title: "Événement 5", date: "2023-05-01", description: "Description 5" },
    { id: 6, title: "Événement 6", date: "2023-06-01", description: "Description 6" },
    { id: 7, title: "Événement 7", date: "2023-07-01", description: "Description 7" },
    { id: 8, title: "Événement 8", date: "2023-08-01", description: "Description 8" },
    { id: 9, title: "Événement 9", date: "2023-09-01", description: "Description 9" },
    { id: 10, title: "Événement 10", date: "2023-10-01", description: "Description 10" },
  ],
};

describe("When Form is created", () => {
  it("a list of fields card is displayed", async () => {
    render(<Home />);
    await screen.findByText("Email");
    await screen.findByText("Nom");
    await screen.findByText("Prénom");
    await screen.findByText("Personel / Entreprise");
  });

  describe("and a click is triggered on the submit button", () => {
    it("the success message is displayed", async () => {
      render(<Home />);
      fireEvent(
        await screen.findByText("Envoyer"),
        new MouseEvent("click", {
          cancelable: true,
          bubbles: true,
        })
      );
      await screen.findByText("En cours");
      await screen.findByText("Message envoyé !");
    });
  });

});


describe("When a page is created", () => {
  it("a list of events is displayed", async () => {
    render(<Home />);
    const eventCards = await screen.findAllByTestId("card-testid");
    expect(eventCards.length).toBeLessThanOrEqual(9);
  });

  it("a list a people is displayed", async () => {
    render(<Home />);
    const peopleCards = await screen.findAllByTestId("people-card");
    expect(peopleCards.length).toBeGreaterThan(0);
  });

  it("a footer is displayed", async () => {
    render(<Home />);
    const footerElement = await screen.findByTestId("footer-testid");
    expect(footerElement).toBeInTheDocument();
  });
  it("an event card, with the last event, is displayed", async () => {
    api.loadData = jest.fn().mockReturnValue(Promise.resolve(mockData));
  
    await act(async () => {
      render(
        <DataProvider>
          <Home />
        </DataProvider>
      );
    });
  
    const footerElement = await screen.findByTestId("footer-testid");
    const lastEventInFooter = within(footerElement).queryByText("Événement 10");
    expect(lastEventInFooter).toBeInTheDocument();
  })
});
