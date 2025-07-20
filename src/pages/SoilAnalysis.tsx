import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Beaker,
  Droplets,
  Thermometer,
  Zap,
  CheckCircle,
  AlertTriangle,
  TrendingUp,
  Leaf,
  ArrowRight,
} from "lucide-react";
import Hero from "../components/Hero";
import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Slider } from "../components/ui/slider";
import { useLanguage } from "../contexts/LanguageContext";

interface SoilData {
  ph: number;
  moisture: number;
  nitrogen: number;
  phosphorus: number;
  potassium: number;
  temperature: number;
  
  organicMatter: number; // %
  electricalConductivity: number; // dS/m
  calcium: number; // mg/kg
  magnesium: number; // mg/kg
  sulfur: number; // mg/kg
  zinc: number; // mg/kg
  iron: number; // mg/kg
  manganese: number; // mg/kg
  copper: number; // mg/kg
  boron: number; // mg/kg
  soilTexture: "clay" | "silt" | "sandy" | "loamy" | "clay-loam" | "silt-loam";
  bulkDensity: number; // g/cm³
  cationExchangeCapacity: number; // meq/100g
  soilDepth: number; // cm
  drainage: "poor" | "moderate" | "good" | "excellent";
  slope: number; // %
  rainfall: number; // mm/year
  irrigationType: "rainfed" | "surface" | "drip" | "sprinkler";
  previousCrop: string;
  tillagePractice: "conventional" | "minimum" | "no-till";
}

interface AnalysisResult {
  ph: { status: "good" | "warning" | "critical"; message: string };
  moisture: { status: "good" | "warning" | "critical"; message: string };
  nitrogen: { status: "good" | "warning" | "critical"; message: string };
  phosphorus: { status: "good" | "warning" | "critical"; message: string };
  potassium: { status: "good" | "warning" | "critical"; message: string };
  recommendedCrops: string[];
  recommendations: string[];
}

// Comprehensive list of all Indian states and their districts
const STATES = [
  { id: 1, name: "Andhra Pradesh", districts: ["Anantapur", "Chittoor", "East Godavari", "Guntur", "Krishna", "Kurnool", "Prakasam", "Srikakulam", "Sri Potti Sriramulu Nellore", "Visakhapatnam", "Vizianagaram", "West Godavari", "YSR Kadapa"] },
  { id: 2, name: "Arunachal Pradesh", districts: ["Tawang", "West Kameng", "East Kameng", "Papum Pare", "Kurung Kumey", "Kra Daadi", "Lower Subansiri", "Upper Subansiri", "West Siang", "East Siang", "Siang", "Upper Siang", "Lower Siang", "Lower Dibang Valley", "Dibang Valley", "Anjaw", "Lohit", "Namsai", "Changlang", "Tirap", "Longding"] },
  { id: 3, name: "Assam", districts: ["Baksa", "Barpeta", "Biswanath", "Bongaigaon", "Cachar", "Charaideo", "Chirang", "Darrang", "Dhemaji", "Dhubri", "Dibrugarh", "Goalpara", "Golaghat", "Hailakandi", "Hojai", "Jorhat", "Kamrup", "Kamrup Metropolitan", "Karbi Anglong", "Karimganj", "Kokrajhar", "Lakhimpur", "Majuli", "Morigaon", "Nagaon", "Nalbari", "Dima Hasao", "Sivasagar", "Sonitpur", "South Salmara-Mankachar", "Tinsukia", "Udalguri", "West Karbi Anglong"] },
  { id: 4, name: "Bihar", districts: ["Araria", "Arwal", "Aurangabad", "Banka", "Begusarai", "Bhagalpur", "Bhojpur", "Buxar", "Darbhanga", "East Champaran (Motihari)", "Gaya", "Gopalganj", "Jamui", "Jehanabad", "Kaimur (Bhabua)", "Katihar", "Khagaria", "Kishanganj", "Lakhisarai", "Madhepura", "Madhubani", "Munger (Monghyr)", "Muzaffarpur", "Nalanda", "Nawada", "Patna", "Purnia (Purnea)", "Rohtas", "Saharsa", "Samastipur", "Saran", "Sheikhpura", "Sheohar", "Sitamarhi", "Siwan", "Supaul", "Vaishali", "West Champaran"] },
  { id: 5, name: "Chhattisgarh", districts: ["Balod", "Baloda Bazar", "Balrampur", "Bastar", "Bemetara", "Bijapur", "Bilaspur", "Dantewada (South Bastar)", "Dhamtari", "Durg", "Gariaband", "Janjgir-Champa", "Jashpur", "Kabirdham (Kawardha)", "Kanker (North Bastar)", "Kondagaon", "Korba", "Koriya", "Mahasamund", "Mungeli", "Narayanpur", "Raigarh", "Raipur", "Rajnandgaon", "Sukma", "Surajpur", "Surguja"] },
  { id: 6, name: "Goa", districts: ["North Goa", "South Goa"] },
  { id: 7, name: "Gujarat", districts: ["Ahmedabad", "Amreli", "Anand", "Aravalli", "Banaskantha (Palanpur)", "Bharuch", "Bhavnagar", "Botad", "Chhota Udepur", "Dahod", "Dang (Ahwa)", "Devbhoomi Dwarka", "Gandhinagar", "Gir Somnath", "Jamnagar", "Junagadh", "Kheda (Nadiad)", "Kutch", "Mahisagar", "Mehsana", "Morbi", "Narmada (Rajpipla)", "Navsari", "Panchmahal (Godhra)", "Patan", "Porbandar", "Rajkot", "Sabarkantha (Himmatnagar)", "Surat", "Surendranagar", "Tapi (Vyara)", "Vadodara", "Valsad"] },
  { id: 8, name: "Haryana", districts: ["Ambala", "Bhiwani", "Charkhi Dadri", "Faridabad", "Fatehabad", "Gurgaon", "Hisar", "Jhajjar", "Jind", "Kaithal", "Karnal", "Kurukshetra", "Mahendragarh", "Nuh", "Palwal", "Panchkula", "Panipat", "Rewari", "Rohtak", "Sirsa", "Sonipat", "Yamunanagar"] },
  { id: 9, name: "Himachal Pradesh", districts: ["Bilaspur", "Chamba", "Hamirpur", "Kangra", "Kinnaur", "Kullu", "Lahaul & Spiti", "Mandi", "Shimla", "Sirmaur (Sirmour)", "Solan", "Una"] },
  { id: 10, name: "Jharkhand", districts: ["Bokaro", "Chatra", "Deoghar", "Dhanbad", "Dumka", "East Singhbhum", "Garhwa", "Giridih", "Godda", "Gumla", "Hazaribag", "Jamtara", "Khunti", "Koderma", "Latehar", "Lohardaga", "Pakur", "Palamu", "Ramgarh", "Ranchi", "Sahibganj", "Seraikela-Kharsawan", "Simdega", "West Singhbhum"] },
  { id: 11, name: "Karnataka", districts: ["Bagalkot", "Ballari (Bellary)", "Belagavi (Belgaum)", "Bengaluru Rural", "Bengaluru Urban", "Bidar", "Chamarajanagar", "Chikballapur", "Chikkamagaluru (Chikmagalur)", "Chitradurga", "Dakshina Kannada", "Davangere", "Dharwad", "Gadag", "Hassan", "Haveri", "Kalaburagi (Gulbarga)", "Kodagu", "Kolar", "Koppal", "Mandya", "Mysuru (Mysore)", "Raichur", "Ramanagara", "Shivamogga (Shimoga)", "Tumakuru (Tumkur)", "Udupi", "Uttara Kannada (Karwar)", "Vijayapura (Bijapur)", "Yadgir"] },
  { id: 12, name: "Kerala", districts: ["Alappuzha", "Ernakulam", "Idukki", "Kannur", "Kasaragod", "Kollam", "Kottayam", "Kozhikode", "Malappuram", "Palakkad", "Pathanamthitta", "Thiruvananthapuram", "Thrissur", "Wayanad"] },
  { id: 13, name: "Madhya Pradesh", districts: ["Agar Malwa", "Alirajpur", "Anuppur", "Ashoknagar", "Balaghat", "Barwani", "Betul", "Bhind", "Bhopal", "Burhanpur", "Chhatarpur", "Chhindwara", "Damoh", "Datia", "Dewas", "Dhar", "Dindori", "Guna", "Gwalior", "Harda", "Hoshangabad", "Indore", "Jabalpur", "Jhabua", "Katni", "Khandwa", "Khargone", "Mandla", "Mandsaur", "Morena", "Narsinghpur", "Neemuch", "Panna", "Raisen", "Rajgarh", "Ratlam", "Rewa", "Sagar", "Satna", "Sehore", "Seoni", "Shahdol", "Shajapur", "Sheopur", "Shivpuri", "Sidhi", "Singrauli", "Tikamgarh", "Ujjain", "Umaria", "Vidisha"] },
  { id: 14, name: "Maharashtra", districts: ["Ahmednagar", "Akola", "Amravati", "Aurangabad", "Beed", "Bhandara", "Buldhana", "Chandrapur", "Dhule", "Gadchiroli", "Gondia", "Hingoli", "Jalgaon", "Jalna", "Kolhapur", "Latur", "Mumbai City", "Mumbai Suburban", "Nagpur", "Nanded", "Nandurbar", "Nashik", "Osmanabad", "Palghar", "Parbhani", "Pune", "Raigad", "Ratnagiri", "Sangli", "Satara", "Sindhudurg", "Solapur", "Thane", "Wardha", "Washim", "Yavatmal"] },
  { id: 15, name: "Manipur", districts: ["Bishnupur", "Chandel", "Churachandpur", "Imphal East", "Imphal West", "Jiribam", "Kakching", "Kamjong", "Kangpokpi", "Noney", "Pherzawl", "Senapati", "Tamenglong", "Tengnoupal", "Thoubal", "Ukhrul"] },
  { id: 16, name: "Meghalaya", districts: ["East Garo Hills", "East Jaintia Hills", "East Khasi Hills", "North Garo Hills", "Ri Bhoi", "South Garo Hills", "South West Garo Hills", "South West Khasi Hills", "West Garo Hills", "West Jaintia Hills", "West Khasi Hills"] },
  { id: 17, name: "Mizoram", districts: ["Aizawl", "Champhai", "Kolasib", "Lawngtlai", "Lunglei", "Mamit", "Saiha", "Serchhip", "Hnahthial", "Khawzawl", "Saitual"] },
  { id: 18, name: "Nagaland", districts: ["Dimapur", "Kiphire", "Kohima", "Longleng", "Mokokchung", "Mon", "Peren", "Phek", "Tuensang", "Wokha", "Zunheboto", "Noklak", "Tseminyu", "Chümoukedima", "Niuland", "Shamator"] },
  { id: 19, name: "Odisha", districts: ["Angul", "Balangir", "Balasore", "Bargarh", "Bhadrak", "Boudh", "Cuttack", "Deogarh", "Dhenkanal", "Gajapati", "Ganjam", "Jagatsinghpur", "Jajpur", "Jharsuguda", "Kalahandi", "Kandhamal", "Kendrapara", "Kendujhar (Keonjhar)", "Khordha", "Koraput", "Malkangiri", "Mayurbhanj", "Nabarangpur", "Nayagarh", "Nuapada", "Puri", "Rayagada", "Sambalpur", "Sonepur", "Sundargarh"] },
  { id: 20, name: "Punjab", districts: ["Amritsar", "Barnala", "Bathinda", "Faridkot", "Fatehgarh Sahib", "Fazilka", "Ferozepur", "Gurdaspur", "Hoshiarpur", "Jalandhar", "Kapurthala", "Ludhiana", "Malerkotla", "Mansa", "Moga", "Mohali", "Muktsar", "Pathankot", "Patiala", "Rupnagar", "Sangrur", "SAS Nagar", "SBS Nagar", "Sri Muktsar Sahib", "Tarn Taran"] },
  { id: 21, name: "Rajasthan", districts: ["Ajmer", "Alwar", "Banswara", "Baran", "Barmer", "Bharatpur", "Bhilwara", "Bikaner", "Bundi", "Chittorgarh", "Churu", "Dausa", "Dholpur", "Dungarpur", "Hanumangarh", "Jaipur", "Jaisalmer", "Jalore", "Jhalawar", "Jhunjhunu", "Jodhpur", "Karauli", "Kota", "Nagaur", "Pali", "Pratapgarh", "Rajsamand", "Sawai Madhopur", "Sikar", "Sirohi", "Sri Ganganagar", "Tonk", "Udaipur"] },
  { id: 22, name: "Sikkim", districts: ["East Sikkim", "North Sikkim", "South Sikkim", "West Sikkim", "Pakyong", "Soreng"] },
  { id: 23, name: "Tamil Nadu", districts: ["Ariyalur", "Chengalpattu", "Chennai", "Coimbatore", "Cuddalore", "Dharmapuri", "Dindigul", "Erode", "Kallakurichi", "Kanchipuram", "Kanyakumari", "Karur", "Krishnagiri", "Madurai", "Mayiladuthurai", "Nagapattinam", "Namakkal", "Nilgiris", "Perambalur", "Pudukkottai", "Ramanathapuram", "Ranipet", "Salem", "Sivaganga", "Tenkasi", "Thanjavur", "Theni", "Thoothukudi", "Tiruchirappalli", "Tirunelveli", "Tirupathur", "Tiruppur", "Tiruvallur", "Tiruvannamalai", "Tiruvarur", "Vellore", "Viluppuram", "Virudhunagar"] },
  { id: 24, name: "Telangana", districts: ["Adilabad", "Bhadradri Kothagudem", "Hyderabad", "Jagtial", "Jangaon", "Jayashankar Bhupalpally", "Jogulamba Gadwal", "Kamareddy", "Karimnagar", "Khammam", "Komaram Bheem", "Mahabubabad", "Mahabubnagar", "Mancherial", "Medak", "Medchal–Malkajgiri", "Mulugu", "Nagarkurnool", "Nalgonda", "Narayanpet", "Nirmal", "Nizamabad", "Peddapalli", "Rajanna Sircilla", "Ranga Reddy", "Sangareddy", "Siddipet", "Suryapet", "Vikarabad", "Wanaparthy", "Warangal Rural", "Warangal Urban", "Yadadri Bhuvanagiri"] },
  { id: 25, name: "Tripura", districts: ["Dhalai", "Gomati", "Khowai", "North Tripura", "Sepahijala", "South Tripura", "Unakoti", "West Tripura"] },
  { id: 26, name: "Uttar Pradesh", districts: ["Agra", "Aligarh", "Ambedkar Nagar", "Amethi", "Amroha", "Auraiya", "Ayodhya", "Azamgarh", "Baghpat", "Bahraich", "Ballia", "Balrampur", "Banda", "Barabanki", "Bareilly", "Basti", "Bhadohi", "Bijnor", "Budaun", "Bulandshahr", "Chandauli", "Chitrakoot", "Deoria", "Etah", "Etawah", "Farrukhabad", "Fatehpur", "Firozabad", "Gautam Buddha Nagar", "Ghaziabad", "Ghazipur", "Gonda", "Gorakhpur", "Hamirpur", "Hapur", "Hardoi", "Hathras", "Jalaun", "Jaunpur", "Jhansi", "Kannauj", "Kanpur Dehat", "Kanpur Nagar", "Kasganj", "Kaushambi", "Kheri", "Kushinagar", "Lalitpur", "Lucknow", "Maharajganj", "Mahoba", "Mainpuri", "Mathura", "Mau", "Meerut", "Mirzapur", "Moradabad", "Muzaffarnagar", "Pilibhit", "Pratapgarh", "Prayagraj", "Raebareli", "Rampur", "Saharanpur", "Sambhal", "Sant Kabir Nagar", "Sant Ravidas Nagar", "Shahjahanpur", "Shamli", "Shravasti", "Siddharthnagar", "Sitapur", "Sonbhadra", "Sultanpur", "Unnao", "Varanasi"] },
  { id: 27, name: "Uttarakhand", districts: ["Almora", "Bageshwar", "Chamoli", "Champawat", "Dehradun", "Haridwar", "Nainital", "Pauri Garhwal", "Pithoragarh", "Rudraprayag", "Tehri Garhwal", "Udham Singh Nagar", "Uttarkashi"] },
  { id: 28, name: "West Bengal", districts: ["Alipurduar", "Bankura", "Birbhum", "Cooch Behar", "Dakshin Dinajpur", "Darjeeling", "Hooghly", "Howrah", "Jalpaiguri", "Jhargram", "Kalimpong", "Kolkata", "Malda", "Murshidabad", "Nadia", "North 24 Parganas", "Paschim Bardhaman", "Paschim Medinipur", "Purba Bardhaman", "Purba Medinipur", "Purulia", "South 24 Parganas", "Uttar Dinajpur"] },
  { id: 29, name: "Andaman and Nicobar Islands", districts: ["Nicobar", "North and Middle Andaman", "South Andaman"] },
  { id: 30, name: "Chandigarh", districts: ["Chandigarh"] },
  { id: 31, name: "Dadra and Nagar Haveli and Daman and Diu", districts: ["Dadra and Nagar Haveli", "Daman", "Diu"] },
  { id: 32, name: "Delhi", districts: ["Central Delhi", "East Delhi", "New Delhi", "North Delhi", "North East Delhi", "North West Delhi", "Shahdara", "South Delhi", "South East Delhi", "South West Delhi", "West Delhi"] },
  { id: 33, name: "Jammu and Kashmir", districts: ["Anantnag", "Bandipora", "Baramulla", "Budgam", "Doda", "Ganderbal", "Jammu", "Kathua", "Kishtwar", "Kulgam", "Kupwara", "Poonch", "Pulwama", "Rajouri", "Ramban", "Reasi", "Samba", "Shopian", "Srinagar", "Udhampur"] },
  { id: 34, name: "Ladakh", districts: ["Kargil", "Leh"] },
  { id: 35, name: "Lakshadweep", districts: ["Agatti", "Amini", "Andrott", "Bithra", "Chetlat", "Kadmat", "Kalpeni", "Kavaratti", "Kiltan", "Minicoy"] },
  { id: 36, name: "Puducherry", districts: ["Karaikal", "Mahe", "Puducherry", "Yanam"] },
];
const CROPS = [
  { id: 1, name: "Wheat" },
  { id: 2, name: "Rice" },
  { id: 3, name: "Maize" },
  { id: 4, name: "Cotton" },
  { id: 5, name: "Sugarcane" },
  { id: 6, name: "Soybean" },
  { id: 7, name: "Groundnut" },
  { id: 8, name: "Potato" },
  { id: 9, name: "Tomato" },
  { id: 10, name: "Onion" },
  { id: 11, name: "Bajra (Pearl Millet)" },
  { id: 12, name: "Barley" },
  { id: 13, name: "Mustard" },
  { id: 14, name: "Chickpea (Gram)" },
  { id: 15, name: "Lentil (Masoor)" },
  { id: 16, name: "Pea" },
  { id: 17, name: "Sugar beet" },
  { id: 18, name: "Sunflower" },
  { id: 19, name: "Jute" },
  { id: 20, name: "Sesame (Til)" },
  { id: 21, name: "Sorghum (Jowar)" },
  { id: 22, name: "Pigeon Pea (Arhar/Tur)" },
  { id: 23, name: "Black Gram (Urad)" },
  { id: 24, name: "Green Gram (Moong)" },
  { id: 25, name: "Cabbage" },
  { id: 26, name: "Cauliflower" },
  { id: 27, name: "Brinjal (Eggplant)" },
  { id: 28, name: "Okra (Lady Finger)" },
  { id: 29, name: "Carrot" },
  { id: 30, name: "Spinach" },
  { id: 31, name: "Pumpkin" },
  { id: 32, name: "Chili Pepper" },
  { id: 33, name: "Garlic" },
  { id: 34, name: "Ginger" },
  { id: 35, name: "Turmeric" },
  { id: 36, name: "Sweet Potato" },
  { id: 37, name: "Radish" },
  { id: 38, name: "Turnip" },
  { id: 39, name: "Cucumber" },
  { id: 40, name: "Bottle Gourd" },
];
// Comprehensive crop requirements database (NPK in kg/ha, pH range, and additional parameters)
const CROP_REQUIREMENTS = [
  // Rice - Different varieties and regions
  { cropId: 2, stateId: 2, district: "Gaya", required_n: 120, required_p: 60, required_k: 40, min_ph: 6.0, max_ph: 7.5, organicMatter: 1.5, ec: 1.0, zinc: 1.0 },
  { cropId: 2, stateId: 2, district: "Patna", required_n: 130, required_p: 65, required_k: 45, min_ph: 6.0, max_ph: 7.5, organicMatter: 1.8, ec: 0.8, zinc: 1.2 },
  { cropId: 2, stateId: 11, district: "Mysuru", required_n: 110, required_p: 55, required_k: 35, min_ph: 5.5, max_ph: 7.0, organicMatter: 2.0, ec: 0.6, zinc: 0.8 },
  
  // Wheat - Different varieties and regions
  { cropId: 1, stateId: 2, district: "Nalanda", required_n: 150, required_p: 75, required_k: 50, min_ph: 6.0, max_ph: 7.5, organicMatter: 1.2, ec: 0.8, zinc: 1.5 },
  { cropId: 1, stateId: 21, district: "Ludhiana", required_n: 160, required_p: 80, required_k: 60, min_ph: 6.5, max_ph: 8.0, organicMatter: 1.0, ec: 1.2, zinc: 1.8 },
  { cropId: 1, stateId: 14, district: "Pune", required_n: 140, required_p: 70, required_k: 45, min_ph: 6.0, max_ph: 7.5, organicMatter: 1.5, ec: 0.7, zinc: 1.2 },
  
  // Maize - Different varieties and regions
  { cropId: 3, stateId: 2, district: "Patna", required_n: 100, required_p: 50, required_k: 40, min_ph: 6.0, max_ph: 7.5, organicMatter: 1.8, ec: 0.8, zinc: 1.0 },
  { cropId: 3, stateId: 21, district: "Amritsar", required_n: 120, required_p: 60, required_k: 50, min_ph: 6.5, max_ph: 8.0, organicMatter: 1.2, ec: 1.0, zinc: 1.5 },
  
  // Cotton - Different varieties and regions
  { cropId: 4, stateId: 7, district: "Ahmedabad", required_n: 80, required_p: 40, required_k: 30, min_ph: 6.5, max_ph: 8.5, organicMatter: 1.0, ec: 1.5, zinc: 0.8 },
  { cropId: 4, stateId: 14, district: "Nagpur", required_n: 90, required_p: 45, required_k: 35, min_ph: 6.0, max_ph: 8.0, organicMatter: 1.2, ec: 1.2, zinc: 1.0 },
  
  // Sugarcane - Different varieties and regions
  { cropId: 5, stateId: 14, district: "Pune", required_n: 200, required_p: 100, required_k: 80, min_ph: 6.5, max_ph: 8.0, organicMatter: 2.0, ec: 1.0, zinc: 1.5 },
  { cropId: 5, stateId: 26, district: "Lucknow", required_n: 220, required_p: 110, required_k: 90, min_ph: 6.0, max_ph: 7.5, organicMatter: 1.8, ec: 0.8, zinc: 1.2 },
  
  // Soybean - Different varieties and regions
  { cropId: 6, stateId: 14, district: "Nagpur", required_n: 60, required_p: 30, required_k: 25, min_ph: 6.0, max_ph: 7.5, organicMatter: 1.5, ec: 0.8, zinc: 1.0 },
  { cropId: 6, stateId: 13, district: "Indore", required_n: 65, required_p: 35, required_k: 30, min_ph: 6.5, max_ph: 8.0, organicMatter: 1.2, ec: 1.0, zinc: 1.2 },
  
  // Groundnut - Different varieties and regions
  { cropId: 7, stateId: 7, district: "Rajkot", required_n: 40, required_p: 20, required_k: 15, min_ph: 6.5, max_ph: 8.0, organicMatter: 1.0, ec: 1.2, zinc: 0.8 },
  { cropId: 7, stateId: 14, district: "Solapur", required_n: 45, required_p: 25, required_k: 20, min_ph: 6.0, max_ph: 7.5, organicMatter: 1.3, ec: 0.9, zinc: 1.0 },
  
  // Potato - Different varieties and regions
  { cropId: 8, stateId: 2, district: "Patna", required_n: 120, required_p: 60, required_k: 50, min_ph: 5.5, max_ph: 7.0, organicMatter: 2.0, ec: 0.8, zinc: 1.5 },
  { cropId: 8, stateId: 21, district: "Jalandhar", required_n: 130, required_p: 65, required_k: 55, min_ph: 6.0, max_ph: 7.5, organicMatter: 1.8, ec: 1.0, zinc: 1.8 },
  
  // Tomato - Different varieties and regions
  { cropId: 9, stateId: 14, district: "Pune", required_n: 80, required_p: 40, required_k: 30, min_ph: 6.0, max_ph: 7.5, organicMatter: 2.0, ec: 0.8, zinc: 1.2 },
  { cropId: 9, stateId: 23, district: "Coimbatore", required_n: 85, required_p: 45, required_k: 35, min_ph: 6.5, max_ph: 8.0, organicMatter: 1.8, ec: 1.0, zinc: 1.5 },
  
  // Onion - Different varieties and regions
  { cropId: 10, stateId: 14, district: "Nashik", required_n: 60, required_p: 30, required_k: 25, min_ph: 6.0, max_ph: 7.5, organicMatter: 1.5, ec: 0.8, zinc: 1.0 },
  { cropId: 10, stateId: 21, district: "Amritsar", required_n: 65, required_p: 35, required_k: 30, min_ph: 6.5, max_ph: 8.0, organicMatter: 1.2, ec: 1.0, zinc: 1.2 },
  
  // Bajra (Pearl Millet) - Different varieties and regions
  { cropId: 11, stateId: 21, district: "Ludhiana", required_n: 80, required_p: 40, required_k: 30, min_ph: 6.5, max_ph: 8.5, organicMatter: 1.0, ec: 1.2, zinc: 0.8 },
  { cropId: 11, stateId: 7, district: "Ahmedabad", required_n: 75, required_p: 35, required_k: 25, min_ph: 6.0, max_ph: 8.0, organicMatter: 1.2, ec: 1.0, zinc: 1.0 },
  
  // Barley - Different varieties and regions
  { cropId: 12, stateId: 21, district: "Amritsar", required_n: 100, required_p: 50, required_k: 40, min_ph: 6.5, max_ph: 8.0, organicMatter: 1.2, ec: 1.0, zinc: 1.5 },
  { cropId: 12, stateId: 2, district: "Gaya", required_n: 90, required_p: 45, required_k: 35, min_ph: 6.0, max_ph: 7.5, organicMatter: 1.5, ec: 0.8, zinc: 1.2 },
  
  // Mustard - Different varieties and regions
  { cropId: 13, stateId: 21, district: "Ludhiana", required_n: 60, required_p: 30, required_k: 25, min_ph: 6.5, max_ph: 8.0, organicMatter: 1.0, ec: 1.0, zinc: 1.0 },
  { cropId: 13, stateId: 2, district: "Patna", required_n: 55, required_p: 25, required_k: 20, min_ph: 6.0, max_ph: 7.5, organicMatter: 1.3, ec: 0.8, zinc: 0.8 },
  
  // Chickpea (Gram) - Different varieties and regions
  { cropId: 14, stateId: 14, district: "Pune", required_n: 40, required_p: 20, required_k: 15, min_ph: 6.0, max_ph: 7.5, organicMatter: 1.5, ec: 0.8, zinc: 1.0 },
  { cropId: 14, stateId: 13, district: "Indore", required_n: 45, required_p: 25, required_k: 20, min_ph: 6.5, max_ph: 8.0, organicMatter: 1.2, ec: 1.0, zinc: 1.2 },
  
  // Lentil (Masoor) - Different varieties and regions
  { cropId: 15, stateId: 2, district: "Nalanda", required_n: 35, required_p: 15, required_k: 10, min_ph: 6.0, max_ph: 7.5, organicMatter: 1.3, ec: 0.8, zinc: 0.8 },
  { cropId: 15, stateId: 14, district: "Nagpur", required_n: 40, required_p: 20, required_k: 15, min_ph: 6.5, max_ph: 8.0, organicMatter: 1.0, ec: 1.0, zinc: 1.0 },
  
  // Pea - Different varieties and regions
  { cropId: 16, stateId: 21, district: "Jalandhar", required_n: 50, required_p: 25, required_k: 20, min_ph: 6.0, max_ph: 7.5, organicMatter: 1.8, ec: 0.8, zinc: 1.2 },
  { cropId: 16, stateId: 14, district: "Pune", required_n: 55, required_p: 30, required_k: 25, min_ph: 6.5, max_ph: 8.0, organicMatter: 1.5, ec: 1.0, zinc: 1.5 },
  
  // Sugar beet - Different varieties and regions
  { cropId: 17, stateId: 21, district: "Amritsar", required_n: 120, required_p: 60, required_k: 50, min_ph: 6.5, max_ph: 8.0, organicMatter: 1.5, ec: 1.0, zinc: 1.2 },
  { cropId: 17, stateId: 2, district: "Patna", required_n: 110, required_p: 55, required_k: 45, min_ph: 6.0, max_ph: 7.5, organicMatter: 1.8, ec: 0.8, zinc: 1.0 },
  
  // Sunflower - Different varieties and regions
  { cropId: 18, stateId: 14, district: "Solapur", required_n: 70, required_p: 35, required_k: 30, min_ph: 6.5, max_ph: 8.0, organicMatter: 1.2, ec: 1.0, zinc: 1.0 },
  { cropId: 18, stateId: 21, district: "Ludhiana", required_n: 75, required_p: 40, required_k: 35, min_ph: 6.0, max_ph: 7.5, organicMatter: 1.0, ec: 1.2, zinc: 1.2 },
  
  // Jute - Different varieties and regions
  { cropId: 19, stateId: 28, district: "Kolkata", required_n: 60, required_p: 30, required_k: 25, min_ph: 6.0, max_ph: 7.5, organicMatter: 1.8, ec: 0.8, zinc: 1.0 },
  { cropId: 19, stateId: 28, district: "Hooghly", required_n: 65, required_p: 35, required_k: 30, min_ph: 6.5, max_ph: 8.0, organicMatter: 1.5, ec: 1.0, zinc: 1.2 },
  
  // Sesame (Til) - Different varieties and regions
  { cropId: 20, stateId: 7, district: "Rajkot", required_n: 40, required_p: 20, required_k: 15, min_ph: 6.5, max_ph: 8.0, organicMatter: 1.0, ec: 1.2, zinc: 0.8 },
  { cropId: 20, stateId: 14, district: "Solapur", required_n: 45, required_p: 25, required_k: 20, min_ph: 6.0, max_ph: 7.5, organicMatter: 1.3, ec: 0.9, zinc: 1.0 },
  
  // Sorghum (Jowar) - Different varieties and regions
  { cropId: 21, stateId: 14, district: "Pune", required_n: 80, required_p: 40, required_k: 30, min_ph: 6.0, max_ph: 7.5, organicMatter: 1.5, ec: 0.8, zinc: 1.0 },
  { cropId: 21, stateId: 13, district: "Indore", required_n: 85, required_p: 45, required_k: 35, min_ph: 6.5, max_ph: 8.0, organicMatter: 1.2, ec: 1.0, zinc: 1.2 },
  
  // Pigeon Pea (Arhar/Tur) - Different varieties and regions
  { cropId: 22, stateId: 14, district: "Nagpur", required_n: 30, required_p: 15, required_k: 10, min_ph: 6.0, max_ph: 7.5, organicMatter: 1.3, ec: 0.8, zinc: 0.8 },
  { cropId: 22, stateId: 13, district: "Indore", required_n: 35, required_p: 20, required_k: 15, min_ph: 6.5, max_ph: 8.0, organicMatter: 1.0, ec: 1.0, zinc: 1.0 },
  
  // Black Gram (Urad) - Different varieties and regions
  { cropId: 23, stateId: 14, district: "Pune", required_n: 35, required_p: 15, required_k: 10, min_ph: 6.0, max_ph: 7.5, organicMatter: 1.5, ec: 0.8, zinc: 1.0 },
  { cropId: 23, stateId: 13, district: "Indore", required_n: 40, required_p: 20, required_k: 15, min_ph: 6.5, max_ph: 8.0, organicMatter: 1.2, ec: 1.0, zinc: 1.2 },
  
  // Green Gram (Moong) - Different varieties and regions
  { cropId: 24, stateId: 14, district: "Nagpur", required_n: 30, required_p: 15, required_k: 10, min_ph: 6.0, max_ph: 7.5, organicMatter: 1.3, ec: 0.8, zinc: 0.8 },
  { cropId: 24, stateId: 13, district: "Indore", required_n: 35, required_p: 20, required_k: 15, min_ph: 6.5, max_ph: 8.0, organicMatter: 1.0, ec: 1.0, zinc: 1.0 },
  
  // Vegetables - Different varieties and regions
  { cropId: 25, stateId: 14, district: "Pune", required_n: 60, required_p: 30, required_k: 25, min_ph: 6.0, max_ph: 7.5, organicMatter: 2.0, ec: 0.8, zinc: 1.2 }, // Cabbage
  { cropId: 26, stateId: 14, district: "Pune", required_n: 65, required_p: 35, required_k: 30, min_ph: 6.0, max_ph: 7.5, organicMatter: 2.0, ec: 0.8, zinc: 1.5 }, // Cauliflower
  { cropId: 27, stateId: 14, district: "Pune", required_n: 55, required_p: 25, required_k: 20, min_ph: 6.0, max_ph: 7.5, organicMatter: 1.8, ec: 0.8, zinc: 1.0 }, // Brinjal
  { cropId: 28, stateId: 14, district: "Pune", required_n: 50, required_p: 25, required_k: 20, min_ph: 6.0, max_ph: 7.5, organicMatter: 1.5, ec: 0.8, zinc: 1.0 }, // Okra
  { cropId: 29, stateId: 14, district: "Pune", required_n: 45, required_p: 20, required_k: 15, min_ph: 6.0, max_ph: 7.5, organicMatter: 1.8, ec: 0.8, zinc: 1.2 }, // Carrot
  { cropId: 30, stateId: 14, district: "Pune", required_n: 40, required_p: 20, required_k: 15, min_ph: 6.0, max_ph: 7.5, organicMatter: 2.0, ec: 0.8, zinc: 1.0 }, // Spinach
  { cropId: 31, stateId: 14, district: "Pune", required_n: 50, required_p: 25, required_k: 20, min_ph: 6.0, max_ph: 7.5, organicMatter: 1.8, ec: 0.8, zinc: 1.0 }, // Pumpkin
  { cropId: 32, stateId: 14, district: "Pune", required_n: 45, required_p: 20, required_k: 15, min_ph: 6.0, max_ph: 7.5, organicMatter: 1.5, ec: 0.8, zinc: 1.0 }, // Chili Pepper
  { cropId: 33, stateId: 14, district: "Pune", required_n: 40, required_p: 20, required_k: 15, min_ph: 6.0, max_ph: 7.5, organicMatter: 1.8, ec: 0.8, zinc: 1.0 }, // Garlic
  { cropId: 34, stateId: 14, district: "Pune", required_n: 50, required_p: 25, required_k: 20, min_ph: 6.0, max_ph: 7.5, organicMatter: 2.0, ec: 0.8, zinc: 1.2 }, // Ginger
  { cropId: 35, stateId: 14, district: "Pune", required_n: 55, required_p: 30, required_k: 25, min_ph: 6.0, max_ph: 7.5, organicMatter: 2.0, ec: 0.8, zinc: 1.5 }, // Turmeric
  { cropId: 36, stateId: 14, district: "Pune", required_n: 60, required_p: 30, required_k: 25, min_ph: 6.0, max_ph: 7.5, organicMatter: 1.8, ec: 0.8, zinc: 1.0 }, // Sweet Potato
  { cropId: 37, stateId: 14, district: "Pune", required_n: 35, required_p: 15, required_k: 10, min_ph: 6.0, max_ph: 7.5, organicMatter: 1.5, ec: 0.8, zinc: 0.8 }, // Radish
  { cropId: 38, stateId: 14, district: "Pune", required_n: 40, required_p: 20, required_k: 15, min_ph: 6.0, max_ph: 7.5, organicMatter: 1.5, ec: 0.8, zinc: 1.0 }, // Turnip
  { cropId: 39, stateId: 14, district: "Pune", required_n: 45, required_p: 20, required_k: 15, min_ph: 6.0, max_ph: 7.5, organicMatter: 1.8, ec: 0.8, zinc: 1.0 }, // Cucumber
  { cropId: 40, stateId: 14, district: "Pune", required_n: 50, required_p: 25, required_k: 20, min_ph: 6.0, max_ph: 7.5, organicMatter: 1.8, ec: 0.8, zinc: 1.0 }, // Bottle Gourd
];

// Extended SoilData for new fields
interface ExtendedSoilData extends SoilData {
  plotArea: number;
  areaUnit: "hectare" | "acre";
  state: number | "";
  district: string;
  crop: number | "";
}

const SoilAnalysis: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [soilData, setSoilData] = useState<ExtendedSoilData>({
    ph: 7.0,
    moisture: 60,
    nitrogen: 50, // kg/ha
    phosphorus: 40, // kg/ha
    potassium: 45, // kg/ha
    temperature: 25,
    // Additional parameters with default values
    organicMatter: 1.5, // %
    electricalConductivity: 0.8, // dS/m
    calcium: 200, // mg/kg
    magnesium: 50, // mg/kg
    sulfur: 15, // mg/kg
    zinc: 0.8, // mg/kg
    iron: 10, // mg/kg
    manganese: 5, // mg/kg
    copper: 1.2, // mg/kg
    boron: 0.5, // mg/kg
    soilTexture: "loamy",
    bulkDensity: 1.4, // g/cm³
    cationExchangeCapacity: 15, // meq/100g
    soilDepth: 30, // cm
    drainage: "moderate",
    slope: 2, // %
    rainfall: 1200, // mm/year
    irrigationType: "surface",
    previousCrop: "",
    tillagePractice: "conventional",
    plotArea: 1,
    areaUnit: "hectare",
    state: "",
    district: "",
    crop: "",
  });
  const [showResults, setShowResults] = useState(false);

  // History state
  const [history, setHistory] = useState<{
    soilData: ExtendedSoilData;
    analysisResult: AnalysisResult;
    timestamp: number;
  }[]>([]);

  const analyzeSoil = (data: ExtendedSoilData): AnalysisResult => {
    const result: AnalysisResult = {
      ph: { status: "good", message: "" },
      moisture: { status: "good", message: "" },
      nitrogen: { status: "good", message: "" },
      phosphorus: { status: "good", message: "" },
      potassium: { status: "good", message: "" },
      recommendedCrops: [],
      recommendations: [],
    };

    // pH Analysis
    if (data.ph < 6.0) {
      result.ph = {
        status: "critical",
        message: "मिट्टी अम्लीय है। चूना डालने की सिफारिश की जाती है।",
      };
    } else if (data.ph > 8.0) {
      result.ph = {
        status: "warning",
        message: "मिट्टी क्षारीय है। गंधक या जिप्सम डालें।",
      };
    } else {
      result.ph = { status: "good", message: "मिट्टी का pH आदर्श है।" };
    }

    // Moisture Analysis
    if (data.moisture < 30) {
      result.moisture = {
        status: "critical",
        message: "मिट्टी में नमी कम है। सिंचाई की आवश्यकता है।",
      };
    } else if (data.moisture > 80) {
      result.moisture = {
        status: "warning",
        message: "मिट्टी में अधिक नमी है। जल निकासी सुधारें।",
      };
    } else {
      result.moisture = {
        status: "good",
        message: "मिट्टी में नमी का स्तर उचित है।",
      };
    }

    // Nitrogen Analysis
    if (data.nitrogen < 30) {
      result.nitrogen = {
        status: "critical",
        message: "नाइट्रोजन की कमी है। यूरिया का प्रयोग करें।",
      };
    } else if (data.nitrogen > 80) {
      result.nitrogen = {
        status: "warning",
        message: "नाइट्रोजन अधिक है। उर्वरक कम करें।",
      };
    } else {
      result.nitrogen = {
        status: "good",
        message: "नाइट्रोजन का स्तर उचित है।",
      };
    }

    // Phosphorus Analysis
    if (data.phosphorus < 25) {
      result.phosphorus = {
        status: "critical",
        message: "फास्फोरस की कमी है। DAP उर्वरक डालें।",
      };
    } else if (data.phosphorus > 70) {
      result.phosphorus = { status: "warning", message: "फास्फोरस अधिक है।" };
    } else {
      result.phosphorus = {
        status: "good",
        message: "फास्फोरस का स्तर उचित है।",
      };
    }

    // Potassium Analysis
    if (data.potassium < 30) {
      result.potassium = {
        status: "critical",
        message: "पोटेशियम की कमी है। MOP उर्वरक डालें।",
      };
    } else if (data.potassium > 75) {
      result.potassium = { status: "warning", message: "पोटेशियम अधिक है।" };
    } else {
      result.potassium = {
        status: "good",
        message: "पोटेशियम का स्तर उचित है।",
      };
    }

    // Crop Recommendations
    if (
      data.ph >= 6.0 &&
      data.ph <= 7.5 &&
      data.moisture >= 40 &&
      data.nitrogen >= 40
    ) {
      result.recommendedCrops = ["धान", "गेहूं", "मक्का"];
    } else if (data.ph >= 6.5 && data.ph <= 8.0) {
      result.recommendedCrops = ["दलहन", "तिलहन", "सब्जी"];
    } else {
      result.recommendedCrops = ["मिश्रित फसल", "चारा फसल"];
    }

    // Enhanced Analysis with new parameters
    const enhancedRecommendations = [];

    // Organic Matter Analysis
    if (data.organicMatter < 1.0) {
      enhancedRecommendations.push("कार्बनिक पदार्थ कम है। हरी खाद और कम्पोस्ट का प्रयोग बढ़ाएं।");
    } else if (data.organicMatter > 3.0) {
      enhancedRecommendations.push("कार्बनिक पदार्थ अधिक है। नाइट्रोजन उर्वरक कम करें।");
    }

    // Electrical Conductivity Analysis
    if (data.electricalConductivity > 2.0) {
      enhancedRecommendations.push("मिट्टी में लवणता अधिक है। जल निकासी सुधारें और जिप्सम डालें।");
    } else if (data.electricalConductivity < 0.3) {
      enhancedRecommendations.push("मिट्टी में लवणता कम है। सूक्ष्म पोषक तत्वों का प्रयोग करें।");
    }

    // Zinc Analysis
    if (data.zinc < 0.5) {
      enhancedRecommendations.push("जिंक की कमी है। जिंक सल्फेट का प्रयोग करें।");
    }

    // Iron Analysis
    if (data.iron < 5) {
      enhancedRecommendations.push("लोहे की कमी है। फेरस सल्फेट का प्रयोग करें।");
    }

    // Calcium Analysis
    if (data.calcium < 150) {
      enhancedRecommendations.push("कैल्शियम की कमी है। जिप्सम या चूना डालें।");
    }

    // Magnesium Analysis
    if (data.magnesium < 30) {
      enhancedRecommendations.push("मैग्नीशियम की कमी है। मैग्नीशियम सल्फेट का प्रयोग करें।");
    }

    // Sulfur Analysis
    if (data.sulfur < 10) {
      enhancedRecommendations.push("सल्फर की कमी है। जिप्सम या अमोनियम सल्फेट का प्रयोग करें।");
    }

    // Soil Texture Recommendations
    if (data.soilTexture === "clay") {
      enhancedRecommendations.push("चिकनी मिट्टी है। जल निकासी सुधारें और रेत मिलाएं।");
    } else if (data.soilTexture === "sandy") {
      enhancedRecommendations.push("बलुई मिट्टी है। कार्बनिक पदार्थ बढ़ाएं और सिंचाई बार-बार करें।");
    }

    // Drainage Recommendations
    if (data.drainage === "poor") {
      enhancedRecommendations.push("जल निकासी खराब है। नालियां बनाएं और जिप्सम डालें।");
    }

    // Slope Recommendations
    if (data.slope > 5) {
      enhancedRecommendations.push("ढलान अधिक है। कंटूर खेती और टेरेसिंग अपनाएं।");
    }

    // Irrigation Type Recommendations
    if (data.irrigationType === "rainfed" && data.rainfall < 1000) {
      enhancedRecommendations.push("वर्षा कम है। सिंचाई सुविधा विकसित करें।");
    }

    // Tillage Practice Recommendations
    if (data.tillagePractice === "conventional" && data.organicMatter < 1.5) {
      enhancedRecommendations.push("न्यूनतम जुताई अपनाएं ताकि कार्बनिक पदार्थ बचा रहे।");
    }

    // General Recommendations
    result.recommendations = [
      "नियमित मिट्टी परीक्षण कराएं",
      "जैविक खाद का प्रयोग बढ़ाएं",
      "फसल चक्र अपनाएं",
      "मिट्टी में कार्बनिक पदार्थ बढ़ाएं",
      ...enhancedRecommendations,
    ];

    return result;
  };

  // Helper: Get crop requirements for selected crop, state, district
  function getCropRequirements(cropId: number, stateId: number, district: string) {
    // Primary: Exact match
    let req = CROP_REQUIREMENTS.find(
      (r) => r.cropId === cropId && r.stateId === stateId && r.district === district
    );
    // Fallback: State-level match
    if (!req) {
      req = CROP_REQUIREMENTS.find(
        (r) => r.cropId === cropId && r.stateId === stateId
      );
    }
    // Fallback: Default values
    if (!req) {
      return {
        required_n: 120,
        required_p: 60,
        required_k: 40,
        min_ph: 6.0,
        max_ph: 7.5,
        organicMatter: 1.5,
        ec: 0.8,
        zinc: 1.0,
      };
    }
    return req;
  }

  // Helper: Validate input
  function validateForm(data: ExtendedSoilData) {
    if (!data.nitrogen || isNaN(Number(data.nitrogen))) return "Invalid nitrogen value";
    if (!data.phosphorus || isNaN(Number(data.phosphorus))) return "Invalid phosphorus value";
    if (!data.potassium || isNaN(Number(data.potassium))) return "Invalid potassium value";
    if (!data.ph || isNaN(Number(data.ph)) || data.ph < 0 || data.ph > 14) return "Invalid pH value";
    if (!data.plotArea || isNaN(Number(data.plotArea)) || data.plotArea <= 0) return "Invalid plot area";
    if (!data.state || !data.district || !data.crop) return "Please select state, district, and crop";
    return null;
  }

  // Main calculation engine
  function calculateResults(data: ExtendedSoilData) {
    // 1. Unit conversions
    // mg/kg to kg/ha (if needed) - assume input is already kg/ha for now
    // 2. Area conversion
    let plotAreaHa = data.plotArea;
    if (data.areaUnit === "acre") {
      plotAreaHa = plotAreaHa * 0.404686;
    }
    // 3. Get crop requirements
    const cropReq = getCropRequirements(Number(data.crop), Number(data.state), data.district);
    // 4. Deficiency calculation
    const nDeficiency = Math.max(0, cropReq.required_n - data.nitrogen);
    const pDeficiency = Math.max(0, cropReq.required_p - data.phosphorus);
    const kDeficiency = Math.max(0, cropReq.required_k - data.potassium);
    // 5. Fertilizer requirement (per ha)
    const ureaPerHa = nDeficiency > 0 ? (nDeficiency * 100) / 46 : 0; // Urea 46% N
    const dapPerHa = pDeficiency > 0 ? (pDeficiency * 100) / 46 : 0; // DAP 46% P
    const mopPerHa = kDeficiency > 0 ? (kDeficiency * 100) / 60 : 0; // MOP 60% K
    // 6. Total fertilizer (scaled by area)
    const totalUrea = ureaPerHa * plotAreaHa;
    const totalDAP = dapPerHa * plotAreaHa;
    const totalMOP = mopPerHa * plotAreaHa;
    // 7. Cost estimation (sample prices)
    const ureaCost = totalUrea * 6; // Rs 6/kg
    const dapCost = totalDAP * 24; // Rs 24/kg
    const mopCost = totalMOP * 17; // Rs 17/kg
    const totalCost = ureaCost + dapCost + mopCost;
    // 8. Enhanced pH and soil health analysis
    let phStatus = "Optimal";
    let phRecommendation = "pH is in optimal range. No adjustment needed.";
    if (data.ph < cropReq.min_ph) {
      phStatus = "Acidic";
      phRecommendation = "Apply agricultural lime to increase soil pH.";
    } else if (data.ph > cropReq.max_ph) {
      phStatus = "Alkaline";
      phRecommendation = "Apply agricultural sulfur or gypsum to decrease soil pH.";
    }

    // 9. Organic Matter Analysis
    let organicMatterStatus = "Optimal";
    let organicMatterRecommendation = "Organic matter content is adequate.";
    if (data.organicMatter < 1.0) {
      organicMatterStatus = "Low";
      organicMatterRecommendation = "Apply green manure, compost, or farmyard manure to increase organic matter.";
    } else if (data.organicMatter > 3.0) {
      organicMatterStatus = "High";
      organicMatterRecommendation = "Organic matter is high. Reduce nitrogen fertilizer application.";
    }

    // 10. Electrical Conductivity Analysis
    let ecStatus = "Normal";
    let ecRecommendation = "Soil salinity is within normal range.";
    if (data.electricalConductivity > 2.0) {
      ecStatus = "High";
      ecRecommendation = "High soil salinity. Improve drainage and apply gypsum.";
    } else if (data.electricalConductivity < 0.3) {
      ecStatus = "Low";
      ecRecommendation = "Low soil salinity. Consider micronutrient application.";
    }

    // 11. Micronutrient Analysis
    const micronutrientDeficiencies = [];
    if (data.zinc < 0.5) micronutrientDeficiencies.push("Zinc");
    if (data.iron < 5) micronutrientDeficiencies.push("Iron");
    if (data.manganese < 3) micronutrientDeficiencies.push("Manganese");
    if (data.copper < 0.8) micronutrientDeficiencies.push("Copper");
    if (data.boron < 0.3) micronutrientDeficiencies.push("Boron");

    // 12. Secondary Nutrient Analysis
    const secondaryNutrientDeficiencies = [];
    if (data.calcium < 150) secondaryNutrientDeficiencies.push("Calcium");
    if (data.magnesium < 30) secondaryNutrientDeficiencies.push("Magnesium");
    if (data.sulfur < 10) secondaryNutrientDeficiencies.push("Sulfur");

    // 13. Soil Physical Properties Analysis
    let soilHealthScore = 100;
    let soilHealthIssues = [];

    // Deduct points for various issues
    if (data.organicMatter < 1.0) { soilHealthScore -= 20; soilHealthIssues.push("Low organic matter"); }
    if (data.electricalConductivity > 2.0) { soilHealthScore -= 15; soilHealthIssues.push("High salinity"); }
    if (data.drainage === "poor") { soilHealthScore -= 10; soilHealthIssues.push("Poor drainage"); }
    if (data.slope > 5) { soilHealthScore -= 5; soilHealthIssues.push("Steep slope"); }
    if (data.soilDepth < 20) { soilHealthScore -= 10; soilHealthIssues.push("Shallow soil"); }
    if (data.bulkDensity > 1.6) { soilHealthScore -= 10; soilHealthIssues.push("High bulk density"); }

    // 14. Crop Suitability Score
    let cropSuitabilityScore = 100;
    let suitabilityIssues = [];

    // pH suitability
    if (data.ph < cropReq.min_ph || data.ph > cropReq.max_ph) {
      cropSuitabilityScore -= 20;
      suitabilityIssues.push("pH not optimal for selected crop");
    }

    // Nutrient suitability
    const nRatio = data.nitrogen / cropReq.required_n;
    const pRatio = data.phosphorus / cropReq.required_p;
    const kRatio = data.potassium / cropReq.required_k;

    if (nRatio < 0.8) { cropSuitabilityScore -= 15; suitabilityIssues.push("Nitrogen deficiency"); }
    if (pRatio < 0.8) { cropSuitabilityScore -= 15; suitabilityIssues.push("Phosphorus deficiency"); }
    if (kRatio < 0.8) { cropSuitabilityScore -= 15; suitabilityIssues.push("Potassium deficiency"); }

    // Organic matter suitability
    if (data.organicMatter < cropReq.organicMatter * 0.8) {
      cropSuitabilityScore -= 10;
      suitabilityIssues.push("Low organic matter for crop requirement");
    }

    // EC suitability
    if (data.electricalConductivity > cropReq.ec * 1.5) {
      cropSuitabilityScore -= 10;
      suitabilityIssues.push("High salinity for crop tolerance");
    }
    // 9. Nutrient status classification
    function getStatusColor(measured: number, required: number) {
      const ratio = measured / required;
      if (ratio >= 0.8 && ratio <= 1.2) return "#4CAF50"; // Optimal
      if (ratio < 0.8) return "#F44336"; // Deficient
      return "#FF9800"; // Excess
    }
    function getStatusText(measured: number, required: number) {
      const ratio = measured / required;
      if (ratio >= 0.8 && ratio <= 1.2) return "Optimal";
      if (ratio < 0.8) return `Deficient (${(required - measured).toFixed(2)} kg/ha needed)`;
      return `Excess (${(measured - required).toFixed(2)} kg/ha extra)`;
    }
    // 15. Results object
    return {
      measured: {
        nitrogen: data.nitrogen,
        phosphorus: data.phosphorus,
        potassium: data.potassium,
        ph: data.ph,
        organicMatter: data.organicMatter,
        electricalConductivity: data.electricalConductivity,
        zinc: data.zinc,
        iron: data.iron,
        manganese: data.manganese,
        copper: data.copper,
        boron: data.boron,
        calcium: data.calcium,
        magnesium: data.magnesium,
        sulfur: data.sulfur,
      },
      required: {
        nitrogen: cropReq.required_n,
        phosphorus: cropReq.required_p,
        potassium: cropReq.required_k,
        minPh: cropReq.min_ph,
        maxPh: cropReq.max_ph,
        organicMatter: cropReq.organicMatter,
        ec: cropReq.ec,
        zinc: cropReq.zinc,
      },
      deficiencies: {
        nitrogen: nDeficiency,
        phosphorus: pDeficiency,
        potassium: kDeficiency,
        micronutrients: micronutrientDeficiencies,
        secondaryNutrients: secondaryNutrientDeficiencies,
      },
      fertilizers: {
        urea: { perHa: ureaPerHa, total: totalUrea, cost: ureaCost },
        dap: { perHa: dapPerHa, total: totalDAP, cost: dapCost },
        mop: { perHa: mopPerHa, total: totalMOP, cost: mopCost },
        totalCost,
      },
      soilHealth: {
        score: soilHealthScore,
        issues: soilHealthIssues,
        organicMatter: {
          status: organicMatterStatus,
          recommendation: organicMatterRecommendation,
        },
        electricalConductivity: {
          status: ecStatus,
          recommendation: ecRecommendation,
        },
        texture: data.soilTexture,
        drainage: data.drainage,
        slope: data.slope,
        depth: data.soilDepth,
        bulkDensity: data.bulkDensity,
      },
      cropSuitability: {
        score: cropSuitabilityScore,
        issues: suitabilityIssues,
        status: cropSuitabilityScore >= 80 ? "Excellent" : 
                cropSuitabilityScore >= 60 ? "Good" : 
                cropSuitabilityScore >= 40 ? "Fair" : "Poor",
      },
      ph: {
        status: phStatus,
        recommendation: phRecommendation,
      },
      plotArea: {
        value: data.plotArea,
        unit: data.areaUnit,
        hectares: plotAreaHa,
      },
      status: {
        nitrogen: {
          color: getStatusColor(data.nitrogen, cropReq.required_n),
          text: getStatusText(data.nitrogen, cropReq.required_n),
        },
        phosphorus: {
          color: getStatusColor(data.phosphorus, cropReq.required_p),
          text: getStatusText(data.phosphorus, cropReq.required_p),
        },
        potassium: {
          color: getStatusColor(data.potassium, cropReq.required_k),
          text: getStatusText(data.potassium, cropReq.required_k),
        },
      },
    };
  }

  // Add state for validation error and calculated results
  const [validationError, setValidationError] = useState<string | null>(null);
  const [calcResults, setCalcResults] = useState<any>(null);

  const handleAnalyze = () => {
    const error = validateForm(soilData);
    if (error) {
      setValidationError(error);
      setShowResults(false);
      return;
    }
    setValidationError(null);
    const results = calculateResults(soilData);
    setCalcResults(results);
    setShowResults(true);
    setHistory((prev) => [
      {
        soilData: { ...soilData },
        analysisResult: analyzeSoil(soilData),
        timestamp: Date.now(),
      },
      ...prev,
    ]);
  };

  const analysisResult = analyzeSoil(soilData);

  const getStatusIcon = (status: "good" | "warning" | "critical") => {
    switch (status) {
      case "good":
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case "warning":
        return <AlertTriangle className="w-5 h-5 text-yellow-600" />;
      case "critical":
        return <AlertTriangle className="w-5 h-5 text-red-600" />;
    }
  };

  const getStatusColor = (status: "good" | "warning" | "critical") => {
    switch (status) {
      case "good":
        return "text-green-700 bg-green-50 border-green-200";
      case "warning":
        return "text-yellow-700 bg-yellow-50 border-yellow-200";
      case "critical":
        return "text-red-700 bg-red-50 border-red-200";
    }
  };

  return (
    <div>
      {/* Hero Section */}
      <Hero
        title="Smart Soil Analysis"
        subtitle="Get Detailed Insights About Your Soil Health"
        description="Use our AI-powered soil analysis tool to understand your soil's condition and get personalized recommendations for better crop yields."
        primaryAction={{
          text: "Start Analysis",
          onClick: () =>
            document
              .getElementById("analysis-tool")
              ?.scrollIntoView({ behavior: "smooth" }),
        }}
        secondaryAction={{
          text: "View Success Stories",
          onClick: () => navigate("/success-stories"),
        }}
      />

      {/* Benefits Section */}
      <section className="py-16 bg-white border-b">
        <div className="container-max section-padding">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              Why Soil Analysis Matters
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Understanding your soil is the foundation of successful farming.
              Our analysis helps you make informed decisions.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-6 text-center">
            <div>
              <TrendingUp className="w-8 h-8 text-agri-primary mx-auto mb-3" />
              <h3 className="font-semibold text-gray-900 mb-2">
                Increase Yields
              </h3>
              <p className="text-sm text-gray-600">
                Optimize nutrient levels for maximum crop productivity
              </p>
            </div>
            <div>
              <Droplets className="w-8 h-8 text-blue-600 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-900 mb-2">
                Water Efficiency
              </h3>
              <p className="text-sm text-gray-600">
                Understand moisture needs and irrigation requirements
              </p>
            </div>
            <div>
              <Leaf className="w-8 h-8 text-green-600 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-900 mb-2">
                Crop Selection
              </h3>
              <p className="text-sm text-gray-600">
                Choose the right crops for your soil conditions
              </p>
            </div>
            <div>
              <Zap className="w-8 h-8 text-yellow-600 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-900 mb-2">
                Cost Reduction
              </h3>
              <p className="text-sm text-gray-600">
                Avoid unnecessary fertilizer and input costs
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Analysis Tool */}
      <section id="analysis-tool" className="py-20 bg-gray-50">
        <div className="container-max section-padding">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Soil Analysis Tool
              </h2>
              <p className="text-lg text-gray-600">
                Enter your soil parameters below to get instant analysis and
                recommendations.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              {/* Input Panel */}
              <Card className="card-agri w-full max-w-full">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Beaker className="w-5 h-5 text-agri-primary" />
                    <span>Soil Parameters</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* pH Level */}
                  <div>
                    <Label className="flex items-center space-x-2 mb-3">
                      <span>pH Level</span>
                      <span className="text-sm text-gray-500">
                        ({soilData.ph})
                      </span>
                    </Label>
                    <Slider
                      value={[soilData.ph]}
                      onValueChange={(value) =>
                        setSoilData({ ...soilData, ph: value[0] })
                      }
                      max={14}
                      min={0}
                      step={0.1}
                      className="w-full"
                    />
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                      <span>Acidic (0-6)</span>
                      <span>Neutral (7)</span>
                      <span>Alkaline (8-14)</span>
                    </div>
                  </div>

                  {/* Moisture */}
                  <div>
                    <Label className="flex items-center space-x-2 mb-3">
                      <Droplets className="w-4 h-4 text-blue-600" />
                      <span>Moisture (%)</span>
                      <span className="text-sm text-gray-500">
                        ({soilData.moisture}%)
                      </span>
                    </Label>
                    <Slider
                      value={[soilData.moisture]}
                      onValueChange={(value) =>
                        setSoilData({ ...soilData, moisture: value[0] })
                      }
                      max={100}
                      min={0}
                      step={1}
                      className="w-full"
                    />
                  </div>

                  {/* Nitrogen */}
                  <div>
                    <Label className="flex items-center space-x-2 mb-3">
                      <span>Nitrogen (N)</span>
                      <span className="text-sm text-gray-500">
                        ({soilData.nitrogen} kg/ha)
                      </span>
                    </Label>
                    <Slider
                      value={[soilData.nitrogen]}
                      onValueChange={(value) =>
                        setSoilData({ ...soilData, nitrogen: value[0] })
                      }
                      max={300}
                      min={0}
                      step={1}
                      className="w-full"
                    />
                  </div>

                  {/* Phosphorus */}
                  <div>
                    <Label className="flex items-center space-x-2 mb-3">
                      <span>Phosphorus (P)</span>
                      <span className="text-sm text-gray-500">
                        ({soilData.phosphorus} kg/ha)
                      </span>
                    </Label>
                    <Slider
                      value={[soilData.phosphorus]}
                      onValueChange={(value) =>
                        setSoilData({ ...soilData, phosphorus: value[0] })
                      }
                      max={200}
                      min={0}
                      step={1}
                      className="w-full"
                    />
                  </div>

                  {/* Potassium */}
                  <div>
                    <Label className="flex items-center space-x-2 mb-3">
                      <span>Potassium (K)</span>
                      <span className="text-sm text-gray-500">
                        ({soilData.potassium} kg/ha)
                      </span>
                    </Label>
                    <Slider
                      value={[soilData.potassium]}
                      onValueChange={(value) =>
                        setSoilData({ ...soilData, potassium: value[0] })
                      }
                      max={300}
                      min={0}
                      step={1}
                      className="w-full"
                    />
                  </div>

                  {/* Temperature */}
                  <div>
                    <Label className="flex items-center space-x-2 mb-3">
                      <Thermometer className="w-4 h-4 text-orange-600" />
                      <span>Temperature (°C)</span>
                      <span className="text-sm text-gray-500">
                        ({soilData.temperature}°C)
                      </span>
                    </Label>
                    <Slider
                      value={[soilData.temperature]}
                      onValueChange={(value) =>
                        setSoilData({ ...soilData, temperature: value[0] })
                      }
                      max={50}
                      min={0}
                      step={1}
                      className="w-full"
                    />
                  </div>

                  {/* Plot Area */}
                  <div>
                    <Label className="flex items-center space-x-2 mb-3">
                      <span>Plot Area</span>
                      <span className="text-sm text-gray-500">({soilData.plotArea} {soilData.areaUnit})</span>
                    </Label>
                    <Input
                      type="number"
                      min={0.01}
                      step={0.01}
                      value={soilData.plotArea}
                      onChange={e => setSoilData({ ...soilData, plotArea: parseFloat(e.target.value) || 0 })}
                      className="w-full"
                    />
                    <div className="flex gap-4 mt-2">
                      <label className="flex items-center gap-1">
                        <input
                          type="radio"
                          name="areaUnit"
                          value="hectare"
                          checked={soilData.areaUnit === "hectare"}
                          onChange={() => setSoilData({ ...soilData, areaUnit: "hectare" })}
                        />
                        Hectare
                      </label>
                      <label className="flex items-center gap-1">
                        <input
                          type="radio"
                          name="areaUnit"
                          value="acre"
                          checked={soilData.areaUnit === "acre"}
                          onChange={() => setSoilData({ ...soilData, areaUnit: "acre" })}
                        />
                        Acre
                      </label>
                    </div>
                  </div>
                  {/* State */}
                  <div>
                    <Label className="flex items-center space-x-2 mb-3">
                      <span>State</span>
                    </Label>
                    <select
                      className="w-full border rounded p-2"
                      value={soilData.state}
                      onChange={e => setSoilData({ ...soilData, state: Number(e.target.value), district: "" })}
                    >
                      <option value="">Select State</option>
                      {STATES.map(state => (
                        <option key={state.id} value={state.id}>{state.name}</option>
                      ))}
                    </select>
                  </div>
                  {/* District */}
                  <div>
                    <Label className="flex items-center space-x-2 mb-3">
                      <span>District</span>
                    </Label>
                    <select
                      className="w-full border rounded p-2"
                      value={soilData.district}
                      onChange={e => setSoilData({ ...soilData, district: e.target.value })}
                      disabled={!soilData.state}
                    >
                      <option value="">Select District</option>
                      {soilData.state && STATES.find(s => s.id === Number(soilData.state))?.districts.map((d: string) => (
                        <option key={d} value={d}>{d}</option>
                      ))}
                    </select>
                  </div>
                  {/* Crop */}
                  <div>
                    <Label className="flex items-center space-x-2 mb-3">
                      <span>Crop</span>
                    </Label>
                    <select
                      className="w-full border rounded p-2"
                      value={soilData.crop}
                      onChange={e => setSoilData({ ...soilData, crop: Number(e.target.value) })}
                    >
                      <option value="">Select Crop</option>
                      {CROPS.map(crop => (
                        <option key={crop.id} value={crop.id}>{crop.name}</option>
                      ))}
                    </select>
                  </div>

                  <Button
                    onClick={handleAnalyze}
                    className="btn-agri-primary w-full"
                  >
                    Analyze Soil
                  </Button>
                </CardContent>
              </Card>

              {/* Results Panel */}
              <Card className="card-agri">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <TrendingUp className="w-5 h-5 text-agri-primary" />
                    <span>Analysis Results</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div id="print-analysis-results">
                    {!showResults ? (
                      <div className="text-center py-12">
                        <Beaker className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                        <p className="text-gray-600">
                          Enter soil parameters and click "Analyze Soil" to see results.
                        </p>
                        {validationError && (
                          <div className="mt-4 text-red-600 font-semibold">{validationError}</div>
                        )}
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {calcResults && (
                          <>
                            <div className="p-3 rounded-lg border bg-gray-50">
                              <div className="font-semibold mb-2">Measured vs Required (per ha)</div>
                              <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-xs">
                                <div>Nitrogen: <span style={{ color: calcResults.status.nitrogen.color }}>{calcResults.measured.nitrogen} / {calcResults.required.nitrogen} ({calcResults.status.nitrogen.text})</span></div>
                                <div>Phosphorus: <span style={{ color: calcResults.status.phosphorus.color }}>{calcResults.measured.phosphorus} / {calcResults.required.phosphorus} ({calcResults.status.phosphorus.text})</span></div>
                                <div>Potassium: <span style={{ color: calcResults.status.potassium.color }}>{calcResults.measured.potassium} / {calcResults.required.potassium} ({calcResults.status.potassium.text})</span></div>
                                <div>pH: {calcResults.measured.ph} (Range: {calcResults.required.minPh} - {calcResults.required.maxPh})</div>
                              </div>
                            </div>
                            <div className="p-3 rounded-lg border bg-yellow-50">
                              <div className="font-semibold mb-2">Deficiencies (per ha)</div>
                              <div className="grid grid-cols-3 gap-2 text-xs">
                                <div>Nitrogen: {calcResults.deficiencies.nitrogen} kg/ha</div>
                                <div>Phosphorus: {calcResults.deficiencies.phosphorus} kg/ha</div>
                                <div>Potassium: {calcResults.deficiencies.potassium} kg/ha</div>
                              </div>
                            </div>
                            <div className="p-3 rounded-lg border bg-blue-50">
                              <div className="font-semibold mb-2">Fertilizer Requirement</div>
                              <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-xs">
                                <div>Urea: {calcResults.fertilizers.urea.perHa.toFixed(2)} kg/ha (Total: {calcResults.fertilizers.urea.total.toFixed(2)} kg, Cost: ₹{calcResults.fertilizers.urea.cost.toFixed(0)})</div>
                                <div>DAP: {calcResults.fertilizers.dap.perHa.toFixed(2)} kg/ha (Total: {calcResults.fertilizers.dap.total.toFixed(2)} kg, Cost: ₹{calcResults.fertilizers.dap.cost.toFixed(0)})</div>
                                <div>MOP: {calcResults.fertilizers.mop.perHa.toFixed(2)} kg/ha (Total: {calcResults.fertilizers.mop.total.toFixed(2)} kg, Cost: ₹{calcResults.fertilizers.mop.cost.toFixed(0)})</div>
                              </div>
                              <div className="mt-2 text-sm font-semibold">Total Cost: ₹{calcResults.fertilizers.totalCost.toFixed(0)}</div>
                            </div>
                            <div className="p-3 rounded-lg border bg-green-50">
                              <div className="font-semibold mb-2">pH Status</div>
                              <div>Status: {calcResults.ph.status}</div>
                              <div>Recommendation: {calcResults.ph.recommendation}</div>
                            </div>
                          </>
                        )}
                        {/* Recommendations and crops from old logic */}
                        <div className="bg-green-50 p-4 rounded-lg border border-green-200 mt-6">
                          <h4 className="font-semibold text-green-800 mb-2 flex items-center space-x-2">
                            <Leaf className="w-4 h-4" />
                            <span>सुझाई गई फसलें</span>
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {analysisResult.recommendedCrops.map(
                              (crop, index) => (
                                <span
                                  key={index}
                                  className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm"
                                >
                                  {crop}
                                </span>
                              ),
                            )}
                          </div>
                        </div>
                        <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                          <h4 className="font-semibold text-blue-800 mb-2">
                            सिफारिशें
                          </h4>
                          <ul className="space-y-1">
                            {analysisResult.recommendations.map((rec, index) => (
                              <li
                                key={index}
                                className="text-sm text-blue-700 flex items-start space-x-2"
                              >
                                <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2"></div>
                                <span>{rec}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    )}
                  </div>
                  {/* Print Button: Only show after analysis */}
                  {showResults && (
                    <div className="flex justify-end mt-4">
                      <button
                        className="btn-agri-primary px-4 py-2 rounded shadow hover:bg-agri-secondary transition-colors"
                        onClick={() => {
                          const printContents = document.getElementById('print-analysis-results')?.innerHTML;
                          const originalContents = document.body.innerHTML;
                          document.body.innerHTML = printContents || '';
                          window.print();
                          document.body.innerHTML = originalContents;
                          window.location.reload(); // reload to restore event handlers
                        }}
                      >
                        Print Analysis Results
                      </button>
                    </div>
                  )}
                  {/* Print CSS: Only show #print-analysis-results when printing */}
                  <style>{`
                    @media print {
                      body * { visibility: hidden; }
                      #print-analysis-results, #print-analysis-results * { visibility: visible; }
                      #print-analysis-results { position: absolute; left: 0; top: 0; width: 100vw; background: #fff; }
                    }
                  `}</style>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* History Section */}
      {history.length > 0 && (
        <section className="py-10 bg-white">
          <div className="container-max section-padding">
            <h3 className="text-2xl font-bold mb-4 text-gray-900">Soil Analysis History (This Session)</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full text-xs md:text-sm bg-white border border-gray-200 rounded-lg">
                <thead>
                  <tr>
                    <th className="px-3 py-2 border-b">Date/Time</th>
                    <th className="px-3 py-2 border-b">pH</th>
                    <th className="px-3 py-2 border-b">Moisture (%)</th>
                    <th className="px-3 py-2 border-b">N (kg/ha)</th>
                    <th className="px-3 py-2 border-b">P (kg/ha)</th>
                    <th className="px-3 py-2 border-b">K (kg/ha)</th>
                    <th className="px-3 py-2 border-b">Temp (°C)</th>
                    <th className="px-3 py-2 border-b">Crops</th>
                  </tr>
                </thead>
                <tbody>
                  {history.map((entry, idx) => (
                    <tr key={entry.timestamp} className="text-center">
                      <td className="px-3 py-2 border-b text-xs">
                        {new Date(entry.timestamp).toLocaleString()}
                      </td>
                      <td className="px-3 py-2 border-b">{entry.soilData.ph}</td>
                      <td className="px-3 py-2 border-b">{entry.soilData.moisture}</td>
                      <td className="px-3 py-2 border-b">{entry.soilData.nitrogen}</td>
                      <td className="px-3 py-2 border-b">{entry.soilData.phosphorus}</td>
                      <td className="px-3 py-2 border-b">{entry.soilData.potassium}</td>
                      <td className="px-3 py-2 border-b">{entry.soilData.temperature}</td>
                      <td className="px-3 py-2 border-b text-xs">
                        {entry.analysisResult.recommendedCrops.join(", ")}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      )}

      {/* How It Works */}
      <section className="py-20 bg-white">
        <div className="container-max section-padding">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              How Our Soil Analysis Works
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Our AI-powered analysis considers multiple factors to provide
              accurate recommendations.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-blue-600 font-bold text-xl">1</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Data Collection
              </h3>
              <p className="text-gray-600">
                Input your soil parameters using our easy-to-use interface or
                connect IoT sensors for automatic data collection.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-green-600 font-bold text-xl">2</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                AI Analysis
              </h3>
              <p className="text-gray-600">
                Our machine learning algorithms analyze your data against
                optimal ranges and local crop requirements.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-purple-600 font-bold text-xl">3</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Recommendations
              </h3>
              <p className="text-gray-600">
                Receive personalized recommendations for crops, fertilizers, and
                soil management practices.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 agri-gradient-bg text-white">
        <div className="container-max section-padding text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Need Professional Soil Testing?
          </h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto opacity-90">
            For more detailed laboratory analysis and field assessments, contact
            our agricultural experts.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={() => navigate("/contact")}
              size="lg"
              variant="secondary"
              className="bg-white text-agri-primary hover:bg-gray-100"
            >
              Contact Our Experts <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
            <Button
              onClick={() => navigate("/chatbot")}
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-agri-primary"
            >
              Ask Our AI Assistant <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SoilAnalysis;
