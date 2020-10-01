'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
   
   let posts = [
    {  
      "title": "cerita tentang kita",
      "description": "sebuah cerita tentang masa lalu",
      "story": `
        Film NANTI KITA CERITA TENTANG HARI INI (NKCTHI) bercerita tentang sebuah keluarga yang terlihat bahagia dan baik-baik saja. Ada kakak beradik bernama Angkasa (Rio Dewanto), Aurora (Sheila Dara Aisha) dan Awan (Rachel Amanda).
        Ketiganya memiliki cerita pilunya masing-masing. Hingga akhirnya, Awan bertemu dan berkenalan dengan seorang pria bernama Kale.
        
        Setelah mengalami kegagalan besar, dengan Kale, Awan justru menemukan sebuah pelajaran hidup baru. Tentang patah, bangun, jatuh, tumbuh, hilang dan semua ketakutan manusia pada umumnya.`,
      "songs": "creep",
      "UserId": 1,
      "createdAt": new Date(),
      "updatedAt": new Date()
    },
    {  
      "title": "kisah pilu",
      "description": "sebuah kisah pilu",
      "story": `
        Film NANTI KITA CERITA TENTANG HARI INI (NKCTHI) bercerita tentang sebuah keluarga yang terlihat bahagia dan baik-baik saja. Ada kakak beradik bernama Angkasa (Rio Dewanto), Aurora (Sheila Dara Aisha) dan Awan (Rachel Amanda).
        Ketiganya memiliki cerita pilunya masing-masing. Hingga akhirnya, Awan bertemu dan berkenalan dengan seorang pria bernama Kale.
        
        Setelah mengalami kegagalan besar, dengan Kale, Awan justru menemukan sebuah pelajaran hidup baru. Tentang patah, bangun, jatuh, tumbuh, hilang dan semua ketakutan manusia pada umumnya.`,
      "songs": "creep",
      "UserId": 1,
      "createdAt": new Date(),
      "updatedAt": new Date()
    },
  ]
    await queryInterface.bulkInsert('Posts',posts,{})
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Posts',null,{})
  }
};
