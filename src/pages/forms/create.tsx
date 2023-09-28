import { Box, Heading } from "@chakra-ui/react";
import AnimatedText from "~/components/AnimatedText";
import CreateForm from "~/components/CreateForm";


export default function Create() {
  return (
    <Box className="relative flex flex-col">
      <Box className="relative">
        <AnimatedText
          text={"Create Form"}
          className="relative left-8 top-8 text-5xl text-purple-700 sm:left-16 sm:top-16 sm:text-6xl md:left-24 md:top-24 md:text-7xl"
        />
      </Box>
      <Box className="op-8 relative left-8 mt-20 sm:left-16 sm:mt-28 md:left-24 md:mt-36 ">
        <CreateForm  />
      </Box>
    </Box>
  );
}
