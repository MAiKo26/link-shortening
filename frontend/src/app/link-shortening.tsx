import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const shortenLink = async (link: string) => {
  try {
    const response = await fetch("http://localhost:3000/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ url: link }),
    });
    const data = await response.json();
    return data.shortUrl;
  } catch (error) {
    console.error("Error shortening link:", error);
    return "";
  }
};

const reverseLink = async (shortId: string) => {
  try {
    const response = await fetch(`${shortId}`, {
      method: "GET",
    });
    console.log(response);
    const url = await response.json();
    console.log(url);
    return url.url;
  } catch (error) {
    console.error("Error reversing link:", error);
    return "";
  }
};

export default function LinkShortener() {
  const [originalLink, setOriginalLink] = useState("");
  const [shortLink, setShortLink] = useState("");
  const [reversedLink, setReversedLink] = useState("");

  const handleShorten = async () => {
    if (originalLink) {
      const shortened = await shortenLink(originalLink);
      setShortLink(shortened);
    }
  };

  const handleReverse = async () => {
    if (shortLink) {
      console.log(shortLink);
      const original = await reverseLink(shortLink);
      setReversedLink(original);
    }
  };

  return (
    <Card className="mx-auto w-full max-w-md">
      <CardHeader>
        <CardTitle>Link Shortener</CardTitle>
        <CardDescription>
          Shorten your links or reverse shortened links
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Input
            type="url"
            placeholder="Enter a long URL to shorten"
            value={originalLink}
            onChange={(e) => setOriginalLink(e.target.value)}
          />
          <Button onClick={handleShorten} className="w-full">
            Shorten Link
          </Button>
          {shortLink && (
            <div className="rounded bg-muted p-2">
              Shortened Link:{" "}
              <a
                href={shortLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline"
              >
                {shortLink}
              </a>
            </div>
          )}
        </div>

        <div className="space-y-2">
          <Input
            type="url"
            placeholder="Enter a short URL to reverse"
            value={shortLink}
            onChange={(e) => setShortLink(e.target.value)}
          />
          <Button onClick={handleReverse} className="w-full">
            Reverse Link
          </Button>
          {reversedLink && (
            <div className="rounded bg-muted p-2">
              Original Link:{" "}
              <a
                href={reversedLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline"
              >
                {reversedLink}
              </a>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
