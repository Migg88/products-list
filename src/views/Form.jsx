import React, { useState } from "react";
import { useFetchFormQuery } from "../features/form/formApiSlice";
import { Box, Button, TextField, Typography } from "@mui/material";

const Form = () => {
    const { data, error, isLoading } = useFetchFormQuery();

    const [formValues, setFormValues] = useState({});
    const [formErrors, setFormErrors] = useState({});

    if (isLoading) return <div>Loading...</div>;
    if (error) {
        console.error("Error loading data:", error);
        return <div>Error loading form data</div>;
    }

    const handleInputChange = (e, uniqueFieldKey) => {
        const { value } = e.target;
        setFormValues((prev) => ({ ...prev, [uniqueFieldKey]: value }));
    };

    const validateField = (attribute, value) => {
        let error = "";
        if (attribute.mandatory === "true" && !value) {
            error = `${attribute.friendlyName} is required.`;
        } else if (attribute.fieldType === "number" && isNaN(value)) {
            error = `${attribute.friendlyName} must be a number.`;
        }
        return error;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const errors = {};

        data.template.attributes.forEach((attribute, index) => {
            const uniqueFieldKey = `${attribute.identifier}-${index}`;
            const value = formValues[uniqueFieldKey] || "";
            const error = validateField(attribute, value);
            if (error) {
                errors[uniqueFieldKey] = error;
            }
        });

        setFormErrors(errors);

        if (Object.keys(errors).length === 0) {
            console.log("Form submitted with values:", formValues);
        }
    };

    return (
        <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: 600, margin: "auto" }}>
            <Typography variant="h4" component="h1" gutterBottom>
                Form
            </Typography>
            {data.template.attributes.map((attribute, index) => {
                const uniqueFieldKey = `${attribute.identifier}-${index}`;

                return (
                    <Box key={uniqueFieldKey} sx={{ mb: 2 }}>
                        <TextField
                            label={attribute.friendlyName}
                            type={attribute.fieldType === "number" ? "number" : "text"}
                            value={formValues[uniqueFieldKey] || ""}
                            onChange={(e) => handleInputChange(e, uniqueFieldKey)}
                            fullWidth
                            variant="outlined"
                            error={!!formErrors[uniqueFieldKey]}
                            helperText={formErrors[uniqueFieldKey] || ""}
                        />
                    </Box>
                );
            })}
            <Button variant="contained" color="primary" type="submit">
                Submit
            </Button>
        </Box>
    );
};

export default Form;
