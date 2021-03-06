const mockBookings = [
  {
    club: "RCTB",
    owner: "6299261c885d2211475ec5ec",
    date: "25/10/2022",
    hour: "17",
    courtType: "Outdoor",
    players: ["6299261c885d2211475ec5ec"],
    id: "629a19fe5a16e50d33d55cb3",
  },
  {
    club: "vallparc",
    owner: "6299261c885d2211475ec5ec",
    date: "25/10/2022",
    hour: "20",
    courtType: "Outdoor",
    players: ["6299261c885d2211475ec5ec"],
    id: "629a19fe5a16e50d33d55cc3",
  },
  {
    club: "RCPB",
    owner: "6299261c885d2211475ec5ec",
    date: "12/05/2622",
    hour: "20",
    courtType: "Outdoor",
    players: [],
    id: "629a19fe5a16e50d33d55cc3",
  },
  {
    club: "otroclub",
    owner: "6299261c885d2211475ec5ec",
    date: "12/05/1922",
    hour: "5",
    courtType: "Indoor",
    players: [],
    id: "629a19fe5a16e50d33d55cc3",
  },
];

const mockNewBookingBody = {
  club: "RCTB",
  owner: "6299261c885d2211475ec5ec",
  date: "25/10/2022",
  hour: "17",
  courtType: "Outdoor",
  players: [],
};

module.exports = { mockBookings, mockNewBookingBody };
