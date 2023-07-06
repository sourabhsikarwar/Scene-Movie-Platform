const FormatPrice=({price})=>{

    return Intl.NumberFormat("en-IN",{
        style:"currency",
        currency:"INR"
    }).format(price/100);
    
    }
    export default FormatPrice