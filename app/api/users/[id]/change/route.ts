import { PrismaClient } from "@prisma/client";
import { NextRequest } from "next/server";

const prisma = new PrismaClient();

// ここからはPOST
export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  // GitHubのIDを格納
  const githubAccountId = params.id;

  const body = await request.json();

  const isLocalStorage: boolean = body.isLocalStorage;

  // // データの有無を調べる
  // const existData = await prisma.user.findUnique({
  //   where: { githubAccountId },
  // });

  const data =
    // existData !== null
    // ? // 更新の処理をする
    await prisma.user.update({
      where: {
        githubAccountId,
      },
      data: {
        isLocalStorage,
      },
    });
  // : // 新規作成の処理をする
  //   await prisma.user.create({
  //     data: {
  //       githubAccountId,
  //       // firstStudentNo,
  //       // studentFavorites,
  //       isLocalStorage,
  //     },
  //   });

  const result = {
    first: data.firstStudentNo,
    favorites: data.studentFavorites,
    isLocalStorage: data.isLocalStorage,
  };

  return new Response(JSON.stringify({ success: true, data: result }));
}
