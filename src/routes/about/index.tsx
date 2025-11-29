import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/about/')({
  component: AboutComponent,
})

function AboutComponent() {
  return <div className="container-narrow">
    <h1>About Project Earth Health</h1>
    <hr />
    <p className="my-1">
      Project Earth Health is a platform where users can learn about and log environmentally friendly actions. Currently you can log cleanup and diet actions, and future updates will add plastic swaps, travel, and custom actions, likely among others.
    </p>
    <p className='mb-1'>
      This app focuses on individual and small-scale actions. The goal is to help users learn news ways they can make a positive impact in their day to day actions, make consistent and lasting changes to their lifestyles, and inspire others to do the same.</p>
    <p className='mb-1'>
      Climate change is a complex and multi-faceted problem, and individual action can feel miniscule. However, a change in mindset and small collective changes can make positive changes, from environmental to psychological. 
    </p>
    <h2>Attributions</h2>
    <hr />
    <h3 className="mt-1">Leaf icon images:</h3>
    <ul className='bullet-ul'>
      <li>
        <a href="https://www.flaticon.com/free-icons/oak" title="oak icons">Oak icons created by surang - Flaticon</a>
      </li>
      <li>
        <a href="https://www.flaticon.com/free-icons/autumn" title="autumn icons">Autumn icons created by IconsNova - Flaticon</a>
      </li>
      <li>
        <a href="https://www.flaticon.com/free-icons/linden" title="linden icons">Linden icons created by surang - Flaticon</a>
      </li>
      <li>
        <a href="https://www.flaticon.com/free-icons/leaves" title="leaves icons">Leaves icons created by Icongeek26 - Flaticon</a>
      </li>
      <li>
        <a href="https://www.flaticon.com/free-icons/chestnut" title="chestnut icons">Chestnut icons created by Icongeek26 - Flaticon</a>
      </li>
      <li>
        <a href="https://www.flaticon.com/free-icons/pine" title="pine icons">Pine icons created by kornkun - Flaticon</a>
      </li>
    </ul>
  </div>
}
