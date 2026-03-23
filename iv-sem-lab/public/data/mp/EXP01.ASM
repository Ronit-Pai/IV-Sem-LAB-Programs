DATA SEGMENT
arr db 06H,12H,15H,56H,65H,70H,78H
len db $-arr
mid db ?
key db 15H
msg1 db 10,13,"Key not found",10,13,"$"
msg2 db 10,13,"Key found at position : $"
DATA ENDS

CODE SEGMENT
ASSUME CS:CODE,DS:DATA
START : MOV AX,DATA
        MOV DS,AX

        DEC len
        MOV DL,00H
        MOV DH,len
        MOV BX,0000
        MOV CL,key

        UP : CMP DL,DH
             JG NOTFOUND
             MOV BL,DL
             ADD BL,DH
             SHR BL,01H
             MOV mid,BL
             CMP CL,arr[BX]
             JZ FOUND
             JB FIRSTHALF
             INC mid
             MOV DL,mid
             JMP UP

 FIRSTHALF : DEC mid
             MOV DH,mid
             JMP UP

  NOTFOUND : LEA DX,msg1
             MOV AH,09H
             INT 21H
             JMP EXIT

     FOUND : LEA DX,msg2
             MOV AH,09H
             INT 21H
             MOV BL,mid
             CALL DISPHEXA

      EXIT : MOV AH,4CH
             INT 21H
      DISPHEXA PROC NEAR
             MOV DL,BL
             MOV CL,04H
             SHR DL,CL
             CMP DL,09H
             JBE L1
             ADD DL,07H

        L1 : ADD DL,30H
             MOV AH,02H
             INT 21H
             MOV DL,BL
             AND DL,0FH
             CMP DL,09H
             JBE L2
             ADD DL,07H
        L2 : ADD DL,30H
             MOV AH,02H
             INT 21H
      RET
      DISPHEXA ENDP

CODE ENDS
END START


