import fastify from "fastify";
import { parse } from "path";
import cors from "@fastify/cors";


const server = fastify({
    logger: true
});

server.register(cors, {
    origin: "*",
    methods: ["GET", "POST"],
})


const teams = [
    {
        id: 1,
        name: "Mercedes",
        base: "Brackley, United Kingdom"
    },
    {
        id: 2,
        name: "Ferrari",
        base: "Maranello, Italy"
    },
    {
        id: 3,
        name: "Red Bull Racing",
        base: "Milton Keynes, United Kingdom"
    },
    {
        id: 4,
        name: "McLaren",
        base: "Woking, United Kingdom"
    },
    {
        id: 5,
        name: "Alpine F1 Team",
        base: "Enstone, United Kingdom"
    },
    {
        id: 6,
        name: "Aston Martin Aramco Formula One Team",
        base: "Silverstone, United Kingdom"
    },
    {
        id: 7,
        name: "Williams Racing",
        base: "Grove, United Kingdom"
    },
    {
        id: 8,
        name: "AlphaTauri",
        base: "Faenza, Italy"
    },
    {
        id: 9,
        name: "Haas F1 Team",
        base: "Kannapolis, United States"
    },
    {
        id: 10,
        name: "Alfa Romeo F1 Team",
        base: "Hinwil, Switzerland"
    }
];

const drivers = [
    {
        id: 1,
        name: "Lewis Hamilton",
        team: "Mercedes"

    },
    {
        id: 2,
        name: "Sebastian Vettel",
        team: "Ferrari"
    },
    {
        id: 3,
        name: "Lando Norris",
        team: "McLaren"
    },
    {
        id: 4,
        name: "Max Verstappen",
        team: "Red Bull"
    }
]

server.get("/teams", async (request, response) => {
    response.type("application/json").code(200)
    return { teams }
});

server.get("/drivers", async (request, response) => {
    response.type("application/json").code(200)
    return { drivers }
})

interface DriverParams {
    id: string
}

server.get<{ Params: DriverParams }>("/drivers/:id", async (request, response) => {
    const id = parseInt(request.params.id);
    const driver = drivers.find((drive) => drive.id === id);

    if (!driver) {
        response.type("application/json").code(404)
        return { message: "Driver not found" }
    }

    response.type("application/json").code(200)
    return { driver }
})

server.listen({ port: 3333 }, () => {
    console.log("Listening on port 3333");
});