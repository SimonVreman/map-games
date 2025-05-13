import { SpringRef, SpringValues, useSpring } from "@react-spring/web";
import { createContext, useContext } from "react";

type Style = {
  x: number;
  y: number;
  scale: number;
  strokeWidth: number;
};

type MapContextType = {
  style: SpringValues<Style>;
  styleApi: SpringRef<Style>;
};

const MapContext = createContext<MapContextType>({} as MapContextType);

export function useMap() {
  const context = useContext(MapContext);
  if (!context) {
    throw new Error("useMapContext must be used within a MapProvider");
  }
  return context;
}

export function MapProvider({
  children,
  style: defaultStyle,
}: {
  children: React.ReactNode;
  style: Style;
}) {
  const [style, styleApi] = useSpring(() => defaultStyle);

  return (
    <MapContext.Provider value={{ style, styleApi }}>
      {children}
    </MapContext.Provider>
  );
}
