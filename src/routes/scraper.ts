import { Router } from "express";
import puppeteer from "puppeteer";
import Product from "../models/product";

const router = Router();

router.get("/scrape", async (req, res) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto("https://example.com/products");

  const products = await page.evaluate(() => {
    const items = Array.from(document.querySelectorAll(".product-item"));
    return items.map((item) => ({
      title: item.querySelector(".product-title")?.textContent,
      price: item.querySelector(".product-price")?.textContent,
      imageUrl: item.querySelector(".product-image img")?.src,
    }));
  });

  await Product.insertMany(products);
  await browser.close();

  res.json({ message: "Scraping completed", products });
});

export default router;
