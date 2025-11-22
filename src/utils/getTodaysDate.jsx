const getTodaysDate = () => {
    // Get today's date in YYYY-MM-DD format for the html date input's max attribute
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
};

export default getTodaysDate;