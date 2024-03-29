import Box from "@mui/material/Box";
import { Paper } from "@mui/material";
import Grid from "@mui/material/Grid";
import VideoCard from "./VideoCard";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { RootState } from "../../redux/configStore";
import { AppDispatch } from "../../redux/configStore";
import { fetchFollowingVideoData } from "../../redux/modules/video";
import { useAppSelector } from "../../redux/configStore.hooks";
let isInitial = true;
const RightVideoSection: React.FC<{ drawerWidth: number }> = (props) => {
  const video = useSelector((state: RootState) => state.video);
  const dispatch = useDispatch<AppDispatch>();
  const isLoggedIn = useAppSelector((state) => state.user.userData.isLoggedIn)

  useEffect(() => {
    if (isInitial) {
      isInitial = false;
      dispatch(fetchFollowingVideoData());

      return;
    }
  }, [video, dispatch]);

  return (
    <Box sx={{ width: { md: props.drawerWidth }, flexShrink: { sm: 0 } }}>
      <Paper
        // variant="permanent"
        sx={{
          display: { xs: "none", md: "flex" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: props.drawerWidth,
          },
          ml: 5,
          p: 2,
        }}
      >
        {/* 컨텐츠 내용 */}
        <Grid container rowSpacing={3}>
          <h3>Following Video</h3>
          {video.followingVideoList.length > 0 ? (
            video.followingVideoList.slice(0, 4).map((video, index) => (
              <Grid item width={"100%"} key={index}>
                <VideoCard nth={3} video={video} />
              </Grid>
            ))
          ) : isLoggedIn ? (
            <div>팔로잉 중인 뮤지션이 없습니다. 팔로우 해주세요! </div>
          ) : <div>팔로잉 목록을 표시하려면 로그인 해주세요!</div>}
        </Grid>
      </Paper>
    </Box>
  );
};

export default RightVideoSection;
