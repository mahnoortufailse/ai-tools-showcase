const catchAsync = require("../utils/catchAsync.js");
const AppError = require("../utils/appError.js");
const pdf = require('html-pdf'); // Import html-pdf

const generatepdf = catchAsync(async (req, res) => {
  const { title, content } = req.body;

  // Define your enhanced HTML template
  const html = `
     <html>
<head>
  <style>
    @page {
      size: A4;
      margin: 25mm; /* Adjust margin as needed */
    }
    body { 
      font-family: 'Helvetica', sans-serif; 
      background-color: #ffffff; /* Background color for the page */
      color: #333; 
      margin: 0; 
      padding: 0;
    }
    .container {
      width: 90%;
      max-width: 300mm; /* Width of A4 */
      margin: 30px auto; /* Center the container and add margin */
      background-color: #ffffff; /* Background color of the container */
      box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
      border-radius: 12px;
      padding: 30px;
      position: relative;
      page-break-inside: avoid; /* Prevent breaking inside the container */
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      min-height: 95vh; /* Ensure the container covers most of the page height */
      overflow: hidden; /* Hide any overflow */
    }
    .header {
      text-align: center;
      padding-bottom: 25px;
      border-bottom: 2px solid #e0e0e0;
    }
    .title { 
      font-size: 32px; 
      font-weight: 700; 
      color: #333;
      margin: 0;
      padding: 0;
    }
    .content { 
      flex-grow: 1; /* Ensures the content grows and pushes the footer down */
      margin-top: 25px;
      font-size: 15px;
      line-height: 1.5;
      text-align: justify;
      color: #555;
      padding: 20px;
      background-color: #ffffff; /* Ensure consistent background color for content */
      overflow-y: auto; /* Allow scrolling within the content area to avoid overflow */
    }
    .footer {
      text-align: center;
      padding-top: 25px;
      padding-bottom: 15px;
      border-top: 2px solid #e0e0e0;
      font-size: 14px;
      color: #888;
      margin-top: 20px; /* Ensure space between content and footer */
    }
    .content img {
      max-width: 100%;
      height: auto;
      display: block;
      margin: 20px auto;
      border-radius: 8px;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <div class="title">${title}</div>
    </div>
    <div class="content">
      ${content}
    </div>
    <div class="footer">
      Generated with Our PDF Generator Tool
    </div>
  </div>
</body>
</html>

`

  // Convert HTML to PDF
  pdf.create(html).toBuffer((err, buffer) => {
    if (err) {
      console.error('Error generating PDF:', err);
      return next(new AppError('Error generating PDF', 500));
    }

    res.setHeader('Content-Disposition', 'attachment; filename=document.pdf');
    res.setHeader('Content-Type', 'application/pdf');
    res.send(buffer);
  });
});

module.exports = { generatepdf };
