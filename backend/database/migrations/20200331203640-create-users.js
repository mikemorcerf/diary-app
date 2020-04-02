module.exports = {  
  down: (queryInterface) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};