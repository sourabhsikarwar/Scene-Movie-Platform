const styles = {
    boxWidth: "xl:max-w-[1440px] w-full mx-auto",
  
    heading1: "font-poppins font-bold md:text-[56px] text-[48px] text-white leading-relaxed",
    heading2: "font-poppins font-medium md:text-[36px] text-[24px] text-white leading-relaxed",
    heading3: "font-poppins font-medium md:text-[24px] text-[24px] text-white leading-relaxed",
    paragraph: "font-poppins font-normal text-dimWhite text-[14px] leading-[24px]",
  
    flexCenter: "flex justify-center items-center",
    flexStart: "flex justify-center items-start",
  
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