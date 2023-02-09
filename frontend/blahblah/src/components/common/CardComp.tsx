import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { Favorite, Visibility } from "@mui/icons-material";
import {
  AspectRatio,
  Avatar,
  Box,
  Card,
  CardCover,
  Chip,
  Link,
  Typography,
} from "@mui/joy";
import React from "react";
import { VideoType } from "../../model/video/VideoType";
import { useNavigate } from "react-router-dom";

const CardWrapper = styled(Card)<{ nth: number }>`
  width: 100%;
  padding: 0;
  & div.float-wrapper {
    & > div {
      position: absolute;
      left: 3px;
      top: 3px;
      border-radius: 13px;
      border: 1.5px solid black;
      width: calc(100% - 8px) !important;
      height: calc(100% - 8px) !important;
      transition: ease-in-out 0.2s;
      overflow: hidden;
      & > img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
    &:after {
      content: "";
      display: block;
      width: calc(100% - 8px);
      height: calc(100% - 8px);
      border-radius: 13px;
      border: 1.5px solid black;
      position: absolute;
      ${({ nth }) =>
        nth &&
        (nth % 4 === 0
          ? css`
              background: #54d7c7;
            `
          : nth % 4 === 1
          ? css`
              background: #f3b63a;
            `
          : nth % 4 === 2
          ? css`
              background: #f55d81;
            `
          : css`
              background: #6dbb58;
            `)}
      z-index: -1;
      right: 0;
      bottom: 0;
    }
  }
  &:hover {
    & div.float-wrapper {
      & > div {
        left: 0;
        top: 0;
      }
    }
  }
`;

type CardCompPropsType = {
  children: React.ReactNode;
  nth: number;
  title?: string;
  caption?: boolean;
  video?: VideoType;
};

export default function CardComp({
  children,
  nth,
  title,
  caption,
  video,
}: CardCompPropsType): JSX.Element {
  const navigate = useNavigate();
  function onClickHandler() {
    navigate(`/video/${video?.id}`);
  }
  return (
    <CardWrapper nth={nth} onClick={onClickHandler}>
      <Box sx={{ position: "relative" }}>
        <AspectRatio ratio="9/5">
          <div className="float-wrapper">
            <div>{children}</div>
          </div>
        </AspectRatio>

        {/* 호버했을 때 표지에 보이는 요소 */}
        <CardCover
          className="gradient-cover ho"
          sx={{
            "&:hover, &:focus-within": {
              opacity: 1,
              left: 0,
              top: 0,
            },
            opacity: 0,
            transition: "0.1s ease-in",
            width: "calc(100% - 8px)",
            height: "calc(100% - 8px)",
            left: "3px",
            top: "3px",
            background:
              "linear-gradient(180deg, transparent 62%, rgba(0,0,0,0.00345888) 63.94%, rgba(0,0,0,0.014204) 65.89%, rgba(0,0,0,0.0326639) 67.83%, rgba(0,0,0,0.0589645) 69.78%, rgba(0,0,0,0.0927099) 71.72%, rgba(0,0,0,0.132754) 73.67%, rgba(0,0,0,0.177076) 75.61%, rgba(0,0,0,0.222924) 77.56%, rgba(0,0,0,0.267246) 79.5%, rgba(0,0,0,0.30729) 81.44%, rgba(0,0,0,0.341035) 83.39%, rgba(0,0,0,0.367336) 85.33%, rgba(0,0,0,0.385796) 87.28%, rgba(0,0,0,0.396541) 89.22%, rgba(0,0,0,0.4) 91.17%)",
          }}
        >
          {/* The first box acts as a container that inherits style from the CardCover */}
          <Box>
            <Box
              sx={{
                p: 2,
                display: "flex",
                alignItems: "center",
                gap: 1.5,
                flexGrow: 1,
                alignSelf: "flex-end",
              }}
            >
              <Typography level="h2" noWrap sx={{ fontSize: "lg" }}>
                <Link
                  href="#dribbble-shot"
                  overlay
                  underline="none"
                  sx={{
                    color: "#fff",
                    textOverflow: "ellipsis",
                    overflow: "hidden",
                    display: "block",
                  }}
                >
                  {title}
                </Link>
              </Typography>
            </Box>
          </Box>
        </CardCover>
      </Box>
      {caption && (
        <Box sx={{ display: "flex", gap: 1, mt: 1.5, alignItems: "center" }}>
          {/* 아바타 */}
          <Avatar
            src="https://image.news1.kr/system/photos/2022/8/2/5508700/article.jpg/dims/optimize"
            size="sm"
            sx={{ "--Avatar-size": "2rem" }}
          />
          <Box>
            {/* 유저 닉네임 */}
            <Typography sx={{ fontSize: "sm", fontWeight: "lg" }}>
              {video?.nickName}
            </Typography>

            {/* 좋아요 표시 */}
            <Link
              href="#dribbble-shot"
              level="body3"
              underline="none"
              startDecorator={<Favorite sx={{ width: 20 }} />}
              color="neutral"
              sx={{
                fontSize: "sm",
                fontWeight: "md",
                ml: "auto",
                "&:hover": { color: "danger.plainColor" },
              }}
            >
              117
            </Link>

            {/* 조회수 표시 */}
            <Link
              href="#dribbble-shot"
              level="body3"
              underline="none"
              startDecorator={<Visibility sx={{ width: 20 }} />}
              color="neutral"
              sx={{
                fontSize: "sm",
                fontWeight: "md",
                ml: 2,
                "&:hover": { color: "primary.plainColor" },
              }}
            >
              {video?.views}
            </Link>
          </Box>

          {/* 라이브 표시 */}
          <Chip
            variant="outlined"
            color="neutral"
            size="sm"
            sx={{
              borderRadius: "sm",
              py: 0.25,
              px: 0.5,
              ml: "auto",
            }}
          >
            Live
          </Chip>
        </Box>
      )}
    </CardWrapper>
  );
}
