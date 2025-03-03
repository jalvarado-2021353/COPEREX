import ExcelJS from "exceljs";
import fs from "fs";
import path from "path";
import Company from "../company/company.model.js";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const generateReport = async (req, res) => {
    try {
        const companies = await Company.find(); 
        if (companies.length === 0) {
            return res.status(404).send({ message: "No companies found to generate report" })
        }
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet("Companies Report");
        worksheet.columns = [
            { header: "Company Name", key: "name", width: 30 },
            { header: "Description", key: "description", width: 50 },
            { header: "Impact Level", key: "impactLevel", width: 15 },
            { header: "Trajectory (Years)", key: "trajectoryYears", width: 15 },
            { header: "Category", key: "category", width: 20 },
            { header: "Status", key: "status", width: 10 }
        ];
        companies.forEach((company) => {
            worksheet.addRow({
                name: company.name,
                description: company.description,
                impactLevel: company.impactLevel,
                trajectoryYears: company.trajectoryYears,
                category: company.category,
                status: company.status ? "Active" : "Inactive"
            })
        })
        const reportsDir = path.join(__dirname, "../../reports")
        if (!fs.existsSync(reportsDir)) {
            fs.mkdirSync(reportsDir, { recursive: true }); 
        }
        const filePath = path.join(reportsDir, "Companies_Report.xlsx")
        await workbook.xlsx.writeFile(filePath);
        return res.send({ message: "Report generated successfully", downloadUrl: `/reports/Companies_Report.xlsx` })
    } catch (err) {
        console.error(err)
        return res.status(500).send({ message: "General error when generating report", err })
    }
}

export const downloadReport = async (req, res) => {
    try {
        const filePath = path.join(__dirname, "../../reports/Companies_Report.xlsx")
        if (!fs.existsSync(filePath)) {
            return res.status(404).send({ message: "Report not found, generate it first" })
        }
        return res.download(filePath, "Companies_Report.xlsx")
    } catch (err) {
        console.error(err);
        return res.status(500).send({ message: "General error when downloading report", err })
    }
}
