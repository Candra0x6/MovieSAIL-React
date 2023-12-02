import React from "react";
import Skeleton from "react-loading-skeleton";

export default function SkeletonLoading({ cards }) {
  return Array(cards)
    .fill(0)
    .map((_, i) => (
      <div key={i} className="flex-col flex gap-y-3 mt-10 w-56">
        <Skeleton width={230} className="h-[20rem] rounded-md" />
        <Skeleton width={80} className="" />
        <Skeleton width={200} className="" />
      </div>
    ));
}
