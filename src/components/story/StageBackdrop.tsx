import "./story.css";

type StageBackdropProps = {
  floor?: boolean;
  /**
   * The homepage extras. Every hero shares the scenery below; the front page is
   * the one that gets the cursor torch, the crossing light shafts and the pulse
   * running up the floor, because it is the one visitors are meant to linger on.
   */
  showcase?: boolean;
};

/**
 * The shared scenery behind every hero: three drifting light sources, a slow
 * sheen, and a grid floor receding to the horizon. Kept in one component so the
 * homepage and the inner pages are literally the same stage rather than two
 * lookalikes that drift apart.
 */
export function StageBackdrop({ floor = true, showcase = false }: StageBackdropProps) {
  return (
    <>
      {showcase && <div aria-hidden="true" className="stage-beams" />}
      <div aria-hidden="true" className="stage-aurora">
        <span />
        <span />
        <span />
      </div>
      <div aria-hidden="true" className="stage-sheen" />
      {floor && <div aria-hidden="true" className="stage-floor" {...(showcase && { "data-pulse": "" })} />}
      {showcase && <div aria-hidden="true" className="stage-torch" />}
    </>
  );
}
