import { Slider } from "@mantine/core";
import "./MarksSlider.css";
import "@mantine/core/styles.css";

interface MarksSliderProps {
  marks: number;
  setMarks: React.Dispatch<React.SetStateAction<number>>;
}

function MarksSlider({ marks, setMarks }: MarksSliderProps) {
  const min = 1;
  const max = 360;
  const step = 1;

  return (
    <div
      style={{
        width: 400,
        margin: "50px auto",
        textAlign: "center",
        position: "relative",
      }}
    >
      <Slider
        size="xl"
        value={marks}
        onChange={(val) => setMarks(val)}
        thumbChildren={
          <div
            style={{
              width: "100%",
              height: "100%",
              borderRadius: "50%",
              overflow: "hidden",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <img
              src="/assets/images/vjsir.jpeg"
              alt="Marks Icon"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
          </div>
        }
        color="red"
        label={marks}
        min={min}
        max={max}
        step={step}
        thumbSize={32}
        styles={{
          thumb: { borderWidth: 2, padding: 0 },
          markLabel: { fontSize: 10 },
        }}
      />

      <p className="mt-3">Selected Marks: {marks}</p>
    </div>
  );
}

export default MarksSlider;
