try (DestroyDialog copybitmap)  catch()--防止重复打开脚本
rollout copybitmap "收集场景贴图"(
	button but_path "收集场景贴图" 					pos:[0,1]		width:(copybitmap.width) 	height:30 tooltip:"点击:刷新路径\nCtrl:设置理解\nATL:打开路径"
	fn KqHffv jOMnGq eALNdV =(
		DWopmd = #()
		append eALNdV jOMnGq[1]
		for i = 2 to jOMnGq.count where (jOMnGq[i] != jOMnGq[1]) do(	append DWopmd jOMnGq[i]	)
		if DWopmd.count != 0 and keyboard.escPressed != true do	KqHffv DWopmd eALNdV
	)
	fn WzRzfP = (
		local FilePath = getfilenamepath maxFilePath + "maps"
		makedir (getfilenamepath maxFilepath + "Maps")as string
		if classof FilePath == string and (doesFileExist FilePath) then(
			try (destroyDialog iRgFBZ )catch()
			rollout iRgFBZ "正在收集" (
				label info "收集场景贴图到maps下进行中" pos:[20,2] width:188 height:13
				label ab "Esc强行退出" pos:[220,2] width:66 height:13
				progressBar khxgqc "" pos:[10,20] width:300 height:8 color:(color 255 255 0)
			)
			createdialog iRgFBZ 320 35 style:#()
			LgVYBd = usedmaps()
			yaEzA = #()
			KqHffv LgVYBd yaEzA
			TheCon = GetCon = yaEzA.count
			FilCon = 0
			for i = 1 to TheCon while not keyboard.escPressed do	(
				iRgFBZ.khxgqc.value = (100/TheCon as float)*i
				try (if not (copyFile yaEzA[i] (FilePath + "\\" + (filenameFromPath yaEzA[i]))) do(GetCon -= 1))catch()
			)
			try (destroydialog iRgFBZ) catch()
			if GetCon.count != 0 then MessageBox ("成功搜集到[ " + (GetCon as string) + " ]张贴图，失败[ " + (FilCon as string) + " ]张。")
		)
		else(	MessageBox "场景没有保存,指定路径径已失效！";try (destroydialog iRgFBZ) catch()	)
	)
	on but_path pressed do(
		try(WzRzfP())catch()
		(--更新贴图路径
		file = getfilenamepath maxFilepath  + "maps" --预设路径
		macros.run "Asset Tracking System" "AssetTrackingSystemShow" --显示路径跟随管理器
		ATSOps.Refresh() --刷新
		actionMan.executeAction -841213575 "2" --全选路径贴图
		--actionMan.executeAction -841213575 "0"
		ATSOps.SetPathOnSelection file CreateOutputFolder:true --自定义文件夹路径
		ATSOps.Refresh() --刷新
		pushPrompt"更新路径成功"
		)
		
	)
)	
createDialog copybitmap 160 40  style:#(#style_toolwindow, #style_sysmenu)
