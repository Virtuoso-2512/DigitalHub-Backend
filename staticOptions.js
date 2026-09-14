const leadStages = ["Registered", "Verified", "Application Form", "Payment Approved", "Application Review", "Enrolled"];

const leadStatus = ["Untouched", "Warm", "Hot", "Cold"];

const postTypesT = ["General", "", "HOD","Vice-Principal/Principal"];

const postTypesNT = ["General", "", "HOD","Vice-Principal/Principal"];

const osNames = ["Unknown", "Windows", "MacOS", "Linux", "Android", "iOS"];

const bldGrp = ["O+", "A+", "A-", "B+", "B-", "AB+", "AB-", "O-", "Unknown"];

const caste = ["Brahmin", "Maratha", "Hindu", "Kunbi", "Jain", "Mali", "Baniya", "Mahar", "Kayastha", "Patil", "Rajput", "Muslim", "Vaishya", "Kshatriya", "Marwadi", "Punjabi", "Buddha", "Bengali", "N/A", "Others"];

const category = ["Open/General", "OBC", "SC", "ST", "SBC", "VJ/DT-A", "NT(A/B/C/D)", "EBC/SEBC", "EWS", "PWD"];

const gender = ["Male", "Female", "Others"];

const marital = ["Married", "Single", "Divorced", "Widow/Widower"];

const motherTongues = ["Hindi", "Bengali", "English", "Gujarati", "Kannada", "Kashmiri", "Konkani", "Marwari", "Malayalam", "Marathi", "Nepali", "Odia", "Punjabi", "Sindhi", "Tamil", "Telugu", "Urdu", "Others"];

const occupation = ["Service", "N/A", "Business", "Others"];

const religion = ["Hindu", "Islam", "Christian", "Sikh", "Buddhist", "Jain", "Judaism", "Others"];

const nonTeachingPosts =  ["Admin", "Employee", "Assisstant"];

const teachingPosts =  ["Principal", "Vice Principal", "HOD", "Class Teacher", "General Teacher"];

module.exports = {
    "lead-stages": leadStages,
    "lead-status": leadStatus,
    "post-types-t": postTypesT,
    "post-types-nt": postTypesNT,
    "os-names": osNames,
    "bldGrp": bldGrp,
    "caste": caste,
    "category": category,
    "gender": gender,
    "marital": marital,
    "mother-tongues": motherTongues,
    "occupation": occupation,
    "religion": religion,
    "non-teaching-posts":nonTeachingPosts,
    "teaching-posts":teachingPosts
};