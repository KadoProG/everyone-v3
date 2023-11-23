import { PrismaClient } from "@prisma/client";
import { NextRequest } from "next/server";

const prisma = new PrismaClient();

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  // GitHubのIDを格納
  const githubAccountId = params.id;

  // データの有無を調べる
  const data = await prisma.user.findUnique({
    where: { githubAccountId },
  });

  if (data === null) {
    return new Response(
      JSON.stringify({
        success: true,
        data: { first: 20216050, favorites: [] },
      })
    );
  }

  const result = {
    first: data.firstStudentNo,
    favorites: data.studentFavorites,
  };

  return new Response(JSON.stringify({ success: true, data: result }));
}

// ここからはPOST
export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  // GitHubのIDを格納
  const githubAccountId = params.id;

  const body = await request.json();

  const firstStudentNo: number = body.first;
  const studentFavorites: number[] = body.favorites;

  // パラメータ空白判定
  if (
    firstStudentNo === undefined ||
    studentFavorites === undefined ||
    typeof firstStudentNo !== "number" ||
    typeof studentFavorites !== "object"
  ) {
    return new Response(
      JSON.stringify({
        success: false,
        message: "パラメータが不足してるか不正",
      })
    );
  }

  // データの有無を調べる
  const existData = await prisma.user.findUnique({
    where: { githubAccountId },
  });

  const data =
    existData !== null
      ? // 更新の処理をする
        await prisma.user.update({
          where: {
            githubAccountId,
          },
          data: {
            firstStudentNo,
            studentFavorites,
          },
        })
      : // 新規作成の処理をする
        await prisma.user.create({
          data: {
            githubAccountId,
            firstStudentNo,
            studentFavorites,
          },
        });

  const result = {
    first: data.firstStudentNo,
    favorites: data.studentFavorites,
  };

  return new Response(JSON.stringify({ success: true, data: result }));
}
