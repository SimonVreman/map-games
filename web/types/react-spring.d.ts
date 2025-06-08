import reactSpring from "@react-spring/web";

declare module "@react-spring/web" {
  const a = {
    children: React.ReactNode,
    ...reactSpring.a,
  };
}
