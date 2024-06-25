@extends('emails.layout')
@section('title', 'أعادة تعيين كلمة السر ')
@section('content')
    <td style="padding:0 35px;">
        <h1 style="margin-bottom: 35px; color:#20e277;">{{ config('app.name') }}</h1>
        <h2 style="color:#1e1e2d; font-weight:500; margin:0;font-size:32px;font-family:'Rubik',sans-serif;">
            لقد طلبت إعادة تعيين كلمة المرور الخاصة بك</h2>
        <span
            style="display:inline-block; vertical-align:middle; margin:29px 0 26px; border-bottom:1px solid #cecece; width:100px;"></span>
        <p style="color:#455056; font-size:15px;line-height:24px; margin:0;">
            لقد أرسلنا لك رقم مكون من أربعة أرقام لاستخدامه لإعادة تعيين كلمة المرور الخاصه بك :
            <span style="color:#037235;font-size:15px ;font-weight:700;text-decoration:underline;"
                class="fs-2 fw-5 text-success">{{ $token }}</span>
        </p>
    </td>
@endsection
