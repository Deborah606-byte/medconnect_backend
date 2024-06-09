const getUser = (userDocument) => {
  return {
    _id: userDocument._id,
    compoundName: userDocument.compoundName,
    location: userDocument.location,
    region: userDocument.region,
    district: userDocument.district,
    operatingHours: userDocument.operatingHours,
    availableServices: userDocument.availableServices,
    email: userDocument.email,
    termsAndConditions: userDocument.termsAndConditions,
  };
};

module.exports = { getUser };
