import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/about/')({
  component: AboutComponent,
})

function AboutComponent() {
  return <div className="container-narrow">
    <h1>About PEH</h1>
    <hr />
    <p className="my-1">
      Project Earth Health is a platform where you can log
      environmentally-friendly actions. Currently you can log a cleanup action, where you can specify the type of environment you cleaned (e.g. park or beach), and optionally the number of items and number of bags of trash collected.
    </p>
    <h2>Future Updates/Additions</h2>
    <hr />
    <ul>
      <li className="ml-1 my" style={{ listStyleType: "circle" }}>
        Travel will be added soon as a Travel Action option.
      </li>
      <li className="ml-1 my" style={{ listStyleType: "circle" }}>
        New action types will be added after Travel Action is complete. The
        next Action Type will be a Diet Action, in which you will be able to
        calculate the impacts of choosing more environmentally-friendly food
        options, such as replacing beef with chicken for a month, or going
        meat and cheese free for a week.
      </li>
    </ul>
  </div>
}
