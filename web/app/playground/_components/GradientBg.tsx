const GradientBg = () => {
  return (
    <div
      className="absolute inset-0 w-full h-96"
      style={{
        WebkitMaskImage: "linear-gradient(to top, transparent, black 30%)",
        maskImage: "linear-gradient(to top, transparent, black 30%)",
        WebkitMaskRepeat: "no-repeat",
        maskRepeat: "no-repeat",
      }}
    >
      <div
        className="w-full h-full bg-[radial-gradient(ellipse_72%_150%_at_50%_100%,#fff,hsla(0,0%,100%,0)),linear-gradient(to_bottom,hsla(0,0%,100%,0)_0%,hsla(0,0%,100%,0)_9.5%,#fff_94%),linear-gradient(hsla(0,0%,100%,.35),hsla(0,0%,100%,.35)),linear-gradient(hsla(0,0%,100%,.35),hsla(0,0%,100%,.35)),linear-gradient(hsla(0,0%,100%,.1),hsla(0,0%,100%,.1)),linear-gradient(to_bottom,hsla(0,0%,100%,0)_0%,#fff_100%),linear-gradient(to_right,#00c4cc_0%,#6f00ff_100%)]
              dark:bg-[radial-gradient(ellipse_72%_150%_at_50%_100%,#1e293b,hsla(0,0%,12%,0)),linear-gradient(to_bottom,hsla(0,0%,12%,0)_0%,hsla(0,0%,12%,0)_9.5%,#1e293b_94%),linear-gradient(hsla(0,0%,12%,.35),hsla(0,0%,12%,.35)),linear-gradient(hsla(0,0%,12%,.35),hsla(0,0%,12%,.35)),linear-gradient(hsla(0,0%,12%,.1),hsla(0,0%,12%,.1)),linear-gradient(to_bottom,hsla(0,0%,12%,0)_0%,#1e293b_100%),linear-gradient(to_right,#00c4cc_0%,#6f00ff_100%)]"
      />
    </div>
  );
};

export default GradientBg;
