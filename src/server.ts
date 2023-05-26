import express from "express";
import cors from "cors";
import * as dotenv from "dotenv";
import { PrismaClient } from "@prisma/client";
import { converteHora, converteMinuto, formatWeekDays } from "./utils/utils";
// import { router } from './routes';

dotenv.config();
const app = express();

app.use(express.json());
app.use(cors());
// app.use(router);

const prisma = new PrismaClient({
  log: ["query"],
});

app.get("/", (req, res) => {
  res.json({ msg: "Rodando Atualizado Novo Teste" });
});

app.get("/games", async (req, res) => {
  const games = await prisma.game.findMany({
    include: {
      _count: {
        select: {
          ads: true,
        },
      },
    },
  });
  return res.json(games);
});

app.post("/games/:id/ads", async (req, res) => {
  const gameId = req.params.id;
  const body: any = req.body;
  console.log(req.body);
  // console.log(body.weekDays);
  // console.log(typeof body.weekDays);
  const ad = await prisma.ad.create({
    data: {
      gameId,
      name: body.name,
      yearsPlaying: body.yearsPlaying,
      discord: body.discord,
      weekDays: formatWeekDays(body.weekDays),
      // weekDays: "2,3",
      hourStart: converteHora(body.hourStart),
      hourEnd: converteHora(body.hourEnd),
      useVoiceChannel: body.useVoiceChannel,
    },
  });
  return res.status(201).json(ad);
});

app.get("/games/:id/ads", async (req, res) => {
  const gameId = req.params.id;
  const ads = await prisma.ad.findMany({
    select: {
      id: true,
      name: true,
      weekDays: true,
      useVoiceChannel: true,
      yearsPlaying: true,
      hourStart: true,
      hourEnd: true,
    },
    where: {
      gameId: gameId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return res.json(
    ads.map((ad) => {
      return {
        ...ad,
        weekDays: ad.weekDays.split(","),
        hourStart: converteMinuto(ad.hourStart),
        hourEnd: converteMinuto(ad.hourEnd),
      };
    })
  );
});

app.get("/ads/:id/discord", async (req, res) => {
  const adId = req.params.id;
  const ad = await prisma.ad.findUniqueOrThrow({
    select: {
      discord: true,
    },
    where: {
      id: adId,
    },
  });
  return res.json({ discord: ad.discord });
});

const port = process.env.PORT || 3333;
app.listen(port);
