import express, { Request, Response } from "express";
import cors from "cors";
import bodyParser from "body-parser";

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Interface for form submission data
interface FormSubmission {
  name: string;
  email: string;
}

// POST endpoint for form submission
app.post(
  "/api/submit",
  (req: Request<{}, {}, FormSubmission>, res: Response) => {
    const { name, email } = req.body;

    // Validate the data
    if (!name || !email) {
      return res.status(400).json({
        success: false,
        message: "Name and email are required",
      });
    }

    // return a success response
    res.status(200).json({
      success: true,
      message: "Form submitted successfully!",
      data: { name, email },
    });
  }
);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
