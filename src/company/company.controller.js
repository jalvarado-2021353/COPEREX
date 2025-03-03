import Company from "./company.model.js";

export const save = async (req, res) => {
    try {
        const data = req.body;
        const existingCompany = await Company.findOne({ name: data.name })
        if (existingCompany) return res.status(400).send({ message: "Company name already exists" })
        const company = new Company(data)
        await company.save();
        return res.status(201).send({ message: `Company ${company.name} registered successfully`, company })
    } catch (err) {
        console.error(err)
        return res.status(500).send({ message: "General error when adding company", err })
    }
};

export const getAll = async (req, res) => {
    try {
        const companies = await Company.find();
        if (companies.length === 0) return res.status(404).send({ message: "No companies found" })
        return res.send({ message: "All companies retrieved successfully", companies })
    } catch (err) {
        console.error(err)
        return res.status(500).send({ message: "General error when fetching companies", err })
    }
}

// por filtro
export const filterCompanies = async (req, res) => {
    try {
        const { category, impactLevel, orderBy } = req.body;
        let filter = {};
        if (category) filter.category = category;
        if (impactLevel) filter.impactLevel = impactLevel;
        let sort = {};
        if (orderBy === "A-Z") sort.name = 1;
        else if (orderBy === "Z-A") sort.name = -1;
        else if (orderBy === "trajectory") sort.trajectoryYears = -1;
        const companies = await Company.find(filter).sort(sort);
        if (companies.length === 0) return res.status(404).send({ message: "No companies found" })
        return res.send({ message: "Filtered companies retrieved", companies })
    } catch (err) {
        console.error("Error filtering companies:", err);
        return res.status(500).send({ message: "Error filtering companies", error: err.message })
    }
}

// Actualizar una empresa
export const update = async (req, res) => {
    try {
        const { id } = req.params;
        const data = req.body;
        const updatedCompany = await Company.findByIdAndUpdate(id, data, { new: true })
        if (!updatedCompany) return res.status(404).send({ message: "Company not found" })
        return res.send({ message: "Company updated successfully", updatedCompany })
    } catch (err) {
        console.error(err);
        return res.status(500).send({ message: "General error when updating company", err })
    }
}

