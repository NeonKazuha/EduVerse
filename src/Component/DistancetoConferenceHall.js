// src/Component/DistancetoConferenceHall.js
import React, { useState, useEffect } from 'react';
import { useAtom } from 'jotai';
import { Findme } from '../Utils/Findme';


const DistancetoConferenceHall = ({ coordinates }) => {
  const [showmenu, setShowmenu] = useState(false);
  const [me] = useAtom(Findme);

  useEffect(() => {
    const interval = setInterval(() => {
      if (me && me.position) {
        const distance = Math.sqrt(
          Math.pow(me.position.x - coordinates[0], 2) +
          Math.pow(me.position.y - coordinates[1], 2) +
          Math.pow(me.position.z - coordinates[2], 2)
        );

        if (distance <= 3) {
          setShowmenu(true);
        } else {
          setShowmenu(false);
        }
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [me, coordinates]);

  return showmenu;
};

export default DistancetoConferenceHall;