import React from "react";
import Rating from "@mui/material/Rating";
import { Card } from "@radix-ui/themes/dist/cjs/index.js";
import { FcBusinessman } from "react-icons/fc";

const ReviewsItem = ({
  rating = 2,
  name = "Anonymous",
  comment = "",
  date,
}) => {
  const formattedDate = date ? new Date(date).toLocaleDateString() : "";

  return (
    <div className="font-Poppins w-full max-w-full rounded-lg border border-gray-200 bg-white p-6">
      <Card className="p-4">
        <div className="flex flex-col items-center gap-3 md:flex-row">
          <div className="flex w-fit items-end overflow-hidden rounded-full bg-gray-400">
            <FcBusinessman size={45} className="rounded-full" />
          </div>

          <div className="flex w-full flex-col justify-between">
            <div className="flex items-center justify-between">
              <div className="flex flex-col items-start">
                <p className="text-[16px] font-medium">{name}</p>
              </div>
              <Rating
                name="read-only"
                value={Number(rating)}
                precision={0.5}
                readOnly
                size="small"
              />
            </div>

            {formattedDate && (
              <p className="mt-1 text-right text-[12px] text-gray-400">
                {formattedDate}
              </p>
            )}
          </div>
        </div>

        {comment && <p className="mt-3 text-[18px] font-normal">{comment}</p>}
      </Card>
    </div>
  );
};

export default React.memo(ReviewsItem);
