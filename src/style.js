const styles = {
  boxWidth: "xl:max-w-[1440px] w-full mx-auto",

  heading1:
    "font-poppins font-bold md:text-[56px] text-[48px] text-black dark:text-white leading-relaxed",
  heading2:
    "font-poppins font-medium md:text-[36px] text-[24px] text-black dark:text-white leading-relaxed",
  heading3:
    "font-poppins font-medium md:text-[24px] text-[24px] leading-relaxed",
  heading4:
    "font-poppins font-medium md:text-[22px] text-[22px] leading-relaxed",
  heading5:
    "font-poppins font-medium md:text-[18px] text-[18px] leading-relaxed",
  paragraph:
    "font-poppins font-normal text-dimWhite text-[14px] leading-[24px]",

  flexCenter: "flex justify-center items-center",
  flexStart: "flex justify-center items-start",

  MovieCard:
    "sm:h-[260px] h-[200px] md:h-[260px] lg:h-[280px] w-[250px] md:w-[250px] hover:scale-105",
  GenreCard:
    "sm:h-[120px] md:h-[180px] lg:h-[200px] w-full hover:scale-105 mx-auto mr-4",
  TvCard: "h-[200px] md:h-[200px] w-[300px] md:w-[300px] hover:scale-105",
  Card: "h-[210px] md:h-[210px] w-[300px] md:w-[300px] hover:scale-105",

  button1: "bg-blue-gradient border-0 text-black px-6 py-3 rounded shadow",
  button2: "bg-blue-gradient border-0 text-black px-4 py-2 rounded shadow",

  paddingX: "sm:px-16 px-6",
  paddingY: "sm:py-16 py-6",
  padding: "sm:px-16 px-6 sm:py-12 py-4",

  marginX: "sm:mx-16 mx-6",
  marginY: "sm:my-16 my-6",
};

export const layout = {
  section: `flex md:flex-row flex-col ${styles.paddingY}`,
  sectionReverse: `flex md:flex-row flex-col-reverse ${styles.paddingY}`,

  sectionImgReverse: `flex-1 flex ${styles.flexCenter} md:mr-10 mr-0 md:mt-0 mt-10 relative`,
  sectionImg: `flex-1 flex ${styles.flexCenter} md:ml-10 ml-0 md:mt-0 mt-10 relative`,

  sectionInfo: `flex-1 ${styles.flexStart} flex-col`,
};

export default styles;
