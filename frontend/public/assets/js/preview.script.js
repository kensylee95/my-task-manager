document.addEventListener("DOMContentLoaded", () => {
    const updatePreview = (inputId, previewId) => {
        const mainInput = document.getElementById(inputId);
        const previewElement = document.getElementById(previewId);

        if (mainInput && previewElement) {
            // Update preview element when input changes
            mainInput.addEventListener("input", () => {
                previewElement.textContent = mainInput.value;
            });

            // Handle change events for dropdowns
            if (mainInput.tagName === "SELECT") {
                mainInput.addEventListener("change", () => {
                    previewElement.textContent = mainInput.options[mainInput.selectedIndex].text;
                });
            }
        }
    };

    // Map main form inputs to preview form fields
    updatePreview("deadline", "preview-deadline");
    updatePreview("title", "preview-title");
    updatePreview("describe", "preview-describe");
    updatePreview("priority", "preview-priority");
    updatePreview("user_id", "preview-userid");
});
