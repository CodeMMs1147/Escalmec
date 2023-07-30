import OverallStat from "../models/OverallStat.js";
import Factura from "../models/Factura.js";

export const getSales = async (req, res) => {
  try {
    const overallStats = await OverallStat.find();

    res.status(200).json(overallStats[0]);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const  createSale = async (req, res) => {
  try {
    const {
      name,
      nit,
      phoneNumber,
      email,
      address,
      billNumber,
      products,
      totalValue
    } = req.body;
  
    const newSale = new Factura({
      name,
      nit,
      phoneNumber,
      email,
      address,
      billNumber,
      products,
      totalValue
    });
    
    const saleSaved = await newSale.save();
    res.status(201).json(saleSaved);
  } catch (error) {
    console.error(req.body);
  }
};

// export const  createClient = async (req, res) => {
//   try {
//     const {
//       userId,
//       clientName,
//       route,
//       commerceName,
//       city,
//       billNumber,
//       cellphoneNumber,
//       customerAdress,
//     } = req.body;
  
//     const newSale = new Factura({
//       userId,
//       clientName,
//       route,
//       commerceName,
//       city,
//       billNumber,
//       cellphoneNumber,
//       vendorName,
//       customerAdress,
//       products,
//       totalValue,
//       estado
//     });
    
//     const saleSaved = await newSale.save();
//     res.status(201).json(saleSaved);
//   } catch (error) {
//     console.error(req.body);
//   }
  
// };
