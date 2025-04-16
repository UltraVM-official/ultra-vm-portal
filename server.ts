// server.ts (start at line 1)
import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import axios from 'axios';
import bodyParser from 'body-parser';

// Load environment variables from .env
dotenv.config();

const app = express();
app.use(bodyParser.json());

// Read keys from environment (keys remain secret in the .env file)
const PTERODACTYL_API_KEY = process.env.PTERODACTYL_API_KEY;
const PTERODACTYL_PANEL_URL = process.env.PTERODACTYL_PANEL_URL;

if (!PTERODACTYL_API_KEY || !PTERODACTYL_PANEL_URL) {
  console.error('Pterodactyl API configuration is missing.');
  process.exit(1);
}

// Create an Axios instance for Pterodactyl API calls
const pteroApi = axios.create({
  baseURL: `${PTERODACTYL_PANEL_URL}/api/application`,
  headers: {
    Authorization: `Bearer ${PTERODACTYL_API_KEY}`,
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

// Example endpoint: User registration synchronization
//
