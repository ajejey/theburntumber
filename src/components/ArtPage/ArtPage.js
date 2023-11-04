import React from 'react'

function ArtPage({artWork}) {
  console.log("INSIDE ArtPage ")
  return (
    <div>
      <div>ART WOEK</div>
      {artWork.name}
      </div>
  )
}

export default ArtPage