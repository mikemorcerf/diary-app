module.exports = {  
  down: (queryInterface) => {
    return queryInterface.bulkDelete('Logs', null, {});
  }
};